// generated on 2017-04-20 using generator-webapp 2.4.1
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
const mkdirp = require('mkdirp');
const cp = require('child_process');
const insert = require('gulp-insert');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

var dev = true;
var configCopied = false;

gulp.task('styles-prep', () => {
    return gulp.src('app/styles/_bootstrap_custom.scss')
      .pipe($.rename('_custom.scss'))
      .pipe(gulp.dest('bower_components/bootstrap/scss/'));
})

gulp.task('styles', ['styles-prep'], () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.if(dev, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

function lint(files) {
  return gulp.src(files)
    .pipe($.eslint({ fix: true }))
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js')
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js')
    .pipe(gulp.dest('test/spec'));
});

gulp.task('jekyll-prep-country-codes', () => {
  return gulp.src(['bower_components/country-list/data/en/country.csv'])
    .pipe(gulp.dest('.tmp.jekyll.source/_data'));
})

gulp.task('jekyll-prep', ['jekyll-prep-country-codes'], () => {
  mkdirp.sync('.tmp.jekyll');
  var exclude = '';
  if (configCopied) { exclude = '!app/_config.yml' }
  return gulp.src(['app/**/*.html', 'app/**/*.yml', 'app/**/*.csv', 'app/**/*.svg', exclude])
      .pipe(gulp.dest('.tmp.jekyll.source'));
})

gulp.task('jekyll', ['jekyll-prep'], (done) => {

  return cp.spawn('docker', [
      'run',
      '-v',
      `${__dirname}/.tmp.jekyll.source:/srv/jekyll`,
      '-v',
      `${__dirname}/.tmp.jekyll:/srv/jekyll_site`,
      'jekyll/jekyll:pages',
      '/usr/local/bin/jekyll',
      'build',
      '--incremental',
      '--trace',
      '-d',
      '/srv/jekyll_site'
    ], { stdio: 'inherit' })
    .on('close', () => {
      done();
    });

  // gulp.src('app/*.{html,liquid}')
  //   .pipe($.liquify({}, { base: 'app/_includes' }))
  //   .pipe(gulp.dest('.tmp'));
});


function renamePath(filename) {
  console.log('# ' + filename);
  if (configCopied) {
    return `page-openrov-com/${filename}`;
  }
  return filename;
}

gulp.task('html', () => {
  return new Promise(resolve => {
    runSequence(['styles', 'scripts'], 'jekyll', 'html-exec', resolve);
  });
})

gulp.task('html-exec', () => {
  return gulp.src('.tmp.jekyll/**/*.html')
    .pipe($.useref({searchPath: ['.tmp',  'app', '.']}))
    .pipe($.if(/\.js$/, $.minify()))
    .pipe($.if(/\.js$/, $.uglify({ mangle: false})))
    .pipe($.if(/\.css$/, $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.js', $.rev()))
    .pipe($.if('*.css', $.rev()))
    .pipe($.revReplace({
      modifyReved: renamePath
    }))
    .pipe($.if(/\.html$/, $.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: {compress: {drop_console: true}},
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe($.if(dev, gulp.dest('.tmp/fonts'), gulp.dest('dist/fonts')));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp*', 'dist']));

gulp.task('serve', () => {
  runSequence(['clean', 'wiredep'], ['jekyll', 'styles', 'scripts', 'fonts'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp', '.tmp.jekyll', 'app'],
        routes: {
          '/bower_components': 'bower_components',
          '/page-openrov-com/images': 'app/images'
        }
      }
    });

    gulp.watch([
      'app/**/*.html',
      'app/images/**/*',
      '.tmp/fonts/**/*',
    ]).on('change', reload);

    gulp.watch(['.tmp.jekyll/**/*'])
      .on('change', () => { setTimeout(reload, 1000)});

    gulp.watch(['app/**/*.{html,liquid}'], ['jekyll']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
  });
});

gulp.task('serve:dist', ['default'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe($.filter(file => file.stat && file.stat.size))
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/**/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap'],
      ignorePath: /^(\.\.\/)*\.\./,
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('prep-dev-deploy', () => {
    
    return new Promise(resolve => {
      runSequence(['clean', 'wiredep'], 'prep-dev-deploy-add-base', 'build', resolve);
    })
});

gulp.task('prep-dev-deploy-add-base', () => {
  configCopied = true;
  return gulp.src('app/_config.yml')
    .pipe(insert.append('base: /page-openrov-com'))
    .pipe(gulp.dest('.tmp.jekyll.source/'))
});

gulp.task('deploy', () => {
  
  return new Promise(resolve => {
    dev = false;
    runSequence('prep-dev-deploy', 'exec-deploy', resolve);
  })

});

gulp.task('exec-deploy', () => {
  return gulp.src('dist/**/*')
    .pipe($.ghPages({
      branch: 'gh-pages',
      remoteUrl: 'git@github.com:codewithpassion/page-openrov-com.git',
      // push: false
    }));

})

gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean', 'wiredep'], 'build', resolve);
  });
});

