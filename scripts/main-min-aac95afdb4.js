"use strict";function validate_input(e){return isEmail(e.find('input[type="email"]').val())}function isEmail(e){return/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(e)}function register(e){$.ajax({type:e.attr("method"),url:e.attr("action"),data:e.serialize(),cache:!1,dataType:"jsonp",jsonp:"c",contentType:"application/json; charset=utf-8",error:function(e){alert("Could not connect to the registration server. Please try again later.")},success:function(t){"success"!=t.result?e.find(".form-group.email").addClass("has-danger"):(e.find(".form-group.email").addClass("has-success"),e.find('input[type="submit"]').attr("disabled",!1),alert(t.msg),setTimeout(function(){e.find(".form-group.email #mce-EMAIL").val(""),e.find(".form-group.email").removeClass("has-success")},1e3))}})}$(window).scroll(function(){var e=$("nav.navbar");$(document).scrollTop()>e.height()?e.addClass("scrolled"):e.removeClass("scrolled")});var preorderCTAs=$(".preoder-cta");preorderCTAs.length>0&&($("#nav-preorder").hide(),$(window).scroll(function(){$(document).scrollTop()>preorderCTAs.position().top?$("#nav-preorder").show():$("#nav-preorder").hide()}));var heroSliders=$(".hero-slider");heroSliders.length>0&&heroSliders.slick({dots:!0,infinite:!0,speed:500,slidesToShow:1,adaptiveHeight:!1,verticalSwiping:!1,arrows:!0,autoplay:"localhost"!==document.location.hostname,autoplaySpeed:5e3}),$(".mfp-gallery").each(function(){$(this).magnificPopup({delegate:"a",type:"image",gallery:{enabled:!0,preload:[0,2],navigateByImgClick:!0}})}),$(".mfp-gallery-zoom").each(function(){$(this).magnificPopup({delegate:"a",type:"image",mainClass:"mfp-with-zoom",gallery:{enabled:!0,preload:[0,2],navigateByImgClick:!0},zoom:{enabled:!0,duration:300,easing:"ease-in-out",opener:function(e){return e.is("img")?e:e.parent().parent().find("img")}}})}),function(e){e.fn.bcSwipe=function(t){var a={threshold:50};return t&&e.extend(a,t),this.each(function(){function t(e){1==e.touches.length&&(o=e.touches[0].pageX,r=!0,s.addEventListener("touchmove",n,!1))}function n(t){if(r){var n=t.touches[0].pageX,s=o-n;Math.abs(s)>=a.threshold&&(i(),s>0?e(this).carousel("next"):e(this).carousel("prev"))}}function i(){s.removeEventListener("touchmove",n),o=null,r=!1}var o,r=!1,s=this;"ontouchstart"in document.documentElement&&s.addEventListener("touchstart",t,!1)}),this}}(jQuery),function(e){e.fn.selectHierarchy=function(t){for(var a={separator:" > ",hideOriginal:!0,placeholder:"------"},t=e.extend(a,t),n=e(this),i=1,o=n.find("option").map(function(){var a=e(this).val();if(a){var n=e(this).text(),o=n.split(t.separator),r=o.length;return r>i&&(i=r),{label:n,short_label:o[r-1],value:a,depth:r,children:[]}}}),r=[],s=1;s<=i;s++)e.each(o,function(){var t=this;t.depth==s&&(1===s&&r.push(this),e.each(o,function(){var e=this;e.depth==s+1&&e.label.match("^"+t.label)==t.label&&t.children.push(e)}))});t.hideOriginal&&n.hide(),n.wrap('<span class="drilldown-wrapper" />'),n.after('<select class="form-control drilldown drilldown-1"><option disabled selected value="">'+t.placeholder+"</option></select>");var l=n.next();l.data("depth",1),e.each(r,function(){var t=e("<option>");t.val(this.value),t.text(this.short_label),t.data("node",this),l.append(t)});var d=function a(){var i=e(this),o=i.find("option:selected"),r=o.data("node");if(i.val()?n.val(i.val()):i.data("depth")>1?n.val(i.prev().val()):n.val(""),i.nextAll("select").remove(),r&&r.children.length>0){i.after('<select class="form-control drilldown"><option selected disabled value="">'+t.placeholder+"</option></select>");var s=i.next();s.addClass("drilldown-"+(r.depth+1)),s.data("depth",r.depth+1),e.each(r.children,function(){var t=e("<option>");t.val(this.value),t.text(this.short_label),t.data("node",this),s.append(t)}),s.change(a)}};l.change(d);var c={};e.each(o,function(){c[this.short_label]=this}),n.find(" option:selected").text().split(t.separator)}}(jQuery),$(document).ready(function(){!function(){$.get("https://openrov.zendesk.com/embeddable/ticket_fields?locale=en").done(function(e){e.forEach(function(e){if("text"==e.type&&"Name"==e.title_in_portal&&$("#nameInput").data("id",e.id),24180405==e.id){var t=$("#modal-contactSupport #typeInput");$("#modal-contactSupport #typeInput").data("id",e.id);var a={},n=e.custom_field_options.map(function(e){for(var t=[],n=e.name.split("::"),i=[],o=0;o<n.length;o++){i.push(n[o]);var r=i.join(" &gt; ");if(!a[r]){a[r]={};var s=o===n.length-1?e.value:void 0;t.push('<option value="'+s+'">'+r+"</option>")}}return t.join(" ")});t.append(n),t.selectHierarchy({hideOriginal:!0,placeholder:" -- select an option -- "})}})});var e="\n\n------------------\nSubmitted from: "+location;$("#modal-contactSupport input[type=submit]").on("click",function(t){t.preventDefault(),$("#modal-contactSupport #nameInput").parent().toggleClass("has-danger",!1),$("#modal-contactSupport #emailInput").parent().toggleClass("has-danger",!1),$("#modal-contactSupport #subjectInput").parent().toggleClass("has-danger",!1),$("#modal-contactSupport #descriptionInput").parent().toggleClass("has-danger",!1),$("#modal-contactSupport .drilldown").parent().parent().toggleClass("has-danger",!1);var a=!1;try{var n=$("#nameInput").val();0==n.trim().length&&($("#nameInput").parent().toggleClass("has-danger",!0),a=!0);var i=$("#emailInput").val();0==i.trim().length&&($("#emailInput").parent().toggleClass("has-danger",!0),a=!0);var o=$("#subjectInput").val();0==o.trim().length&&($("#subjectInput").parent().toggleClass("has-danger",!0),a=!0);var r=$("#descriptionInput").val();0==r.trim().length&&($("#descriptionInput").parent().toggleClass("has-danger",!0),a=!0);var s="",l=$("#modal-contactSupport .drilldown");$(l[l.length-1]).children().toArray().forEach(function(e){e.selected&&e.value&&(s=e.value)}),0==s.trim().length&&($(l[l.length-1]).parent().parent().toggleClass("has-danger",!0),a=!0);var d=$("#nameInput").data("id"),c=$("#typeInput").data("id"),p={subject:o,tags:["web_widget"],via_id:48,comment:{body:r+e},requester:{name:n,email:i,locale_id:1},fields:{}};if(p.fields[d]=n,p.fields[c]=s,a)return;$("#submitter").prop("disabled",!0),$.ajax({type:"POST",url:"https://openrov.zendesk.com/api/v2/requests.json",data:JSON.stringify({request:p}),dataType:"json",contentType:"application/json",beforeSend:function(e){e.setRequestHeader("Authorization","Basic "+btoa(i+"/token:BO4MEQQtX70i6kDJqFmUb5voRNo8OPs2qcyGISBz"))}}).done(function(e){$("#contact-support-success").removeClass("d-none")}).fail(function(e){$("#contact-support-error").removeClass("d-none"),window.trackJavaScriptError&&window.trackJavaScriptError(e,"Contact support form")})}catch(e){return void console.error(e)}})}()}),$(document).ready(function(){var e=$("#mc-embedded-subscribe-form");e.length>0&&e.find('input[type="submit"]').bind("click",function(t){t&&t.preventDefault(),validate_input(e)?($(this).attr("disabled",!0),e.find(".form-group.email").removeClass("has-warning"),register(e)):e.find(".form-group.email").addClass("has-warning")})});var videos=$(".video-container.mouseover-play");videos.on("mouseover",function(e){$(this).addClass("play");var t=$(this).find(".card-video");$(this).find(".card-img").css("opacity",0),t.css("opacity",1),t.get(0).play()}).on("mouseout",function(e){$(this).removeClass("play"),$(this).find(".card-video")[0].pause()}),videos.append('<div class="video-fullscreen"><i class="fa fa-arrows-alt" aria-hidden="true"></i></div>'),videos.append('<div class="card-video-control"><span class="fa fa-play-circle-o play" aria-hidden="true"></span><span class="fa fa-pause-circle-o pause" aria-hidden="true"></span></div>'),videos.append('<div class="video-loading-indicator invisible"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'),videos.find(".video-fullscreen").click(function(){$(this).parent().find("video").get(0).requestFullscreen()}),videos.find("video").each(function(e,t){t.onwaiting=function(){$(t).parent().find(".video-loading-indicator").removeClass("invisible")},t.onplaying=function(){$(t).parent().find(".video-loading-indicator").addClass("invisible")}});