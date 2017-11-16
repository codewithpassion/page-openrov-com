"use strict";function validate_input($form){return isEmail($form.find('input[type="email"]').val())}function isEmail(email){return/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email)}function register($form){$.ajax({type:$form.attr("method"),url:$form.attr("action"),data:$form.serialize(),cache:!1,dataType:"jsonp",jsonp:"c",contentType:"application/json; charset=utf-8",error:function(err){alert("Could not connect to the registration server. Please try again later.")},success:function(data){"success"!=data.result?$form.find(".form-group.email").addClass("has-danger"):($form.find(".form-group.email").addClass("has-success"),$form.find('input[type="submit"]').attr("disabled",!1),alert(data.msg),setTimeout(function(){$form.find(".form-group.email #mce-EMAIL").val(""),$form.find(".form-group.email").removeClass("has-success")},1e3))}})}$(window).scroll(function(){var navbar=$("nav.navbar");$(document).scrollTop()>navbar.height()?navbar.addClass("scrolled"):navbar.removeClass("scrolled")});var preorderCTAs=$(".preoder-cta");preorderCTAs.length>0&&($("#nav-preorder").hide(),$(window).scroll(function(){$(document).scrollTop()>preorderCTAs.position().top?$("#nav-preorder").show():$("#nav-preorder").hide()}));var heroSliders=$(".hero-slider");heroSliders.length>0&&heroSliders.slick({dots:!0,infinite:!0,speed:500,slidesToShow:1,adaptiveHeight:!1,verticalSwiping:!1,arrows:!0,autoplay:"localhost"!==document.location.hostname,autoplaySpeed:5e3}),$(".mfp-gallery").each(function(){$(this).magnificPopup({delegate:"a",type:"image",gallery:{enabled:!0,preload:[0,2],navigateByImgClick:!0}})}),$(".mfp-gallery-zoom").each(function(){$(this).magnificPopup({delegate:"a",type:"image",mainClass:"mfp-with-zoom",gallery:{enabled:!0,preload:[0,2],navigateByImgClick:!0},zoom:{enabled:!0,duration:300,easing:"ease-in-out",opener:function(openerElement){return openerElement.is("img")?openerElement:openerElement.parent().parent().find("img")}}})}),function($){$.fn.bcSwipe=function(settings){var config={threshold:50};return settings&&$.extend(config,settings),this.each(function(){function onTouchStart(e){1==e.touches.length&&(start=e.touches[0].pageX,stillMoving=!0,self.addEventListener("touchmove",onTouchMove,!1))}function onTouchMove(e){if(stillMoving){var x=e.touches[0].pageX,difference=start-x;Math.abs(difference)>=config.threshold&&(cancelTouch(),difference>0?$(this).carousel("next"):$(this).carousel("prev"))}}function cancelTouch(){self.removeEventListener("touchmove",onTouchMove),start=null,stillMoving=!1}var start,stillMoving=!1,self=this;"ontouchstart"in document.documentElement&&self.addEventListener("touchstart",onTouchStart,!1)}),this}}(jQuery),function($){$.fn.selectHierarchy=function(options){for(var defaults={separator:" > ",hideOriginal:!0,placeholder:"------"},options=$.extend(defaults,options),obj=$(this),max_depth=1,choices=obj.find("option").map(function(){var val=$(this).val();if(val){var txt=$(this).text(),segments=txt.split(options.separator),depth=segments.length;depth>max_depth&&(max_depth=depth);return{label:txt,short_label:segments[depth-1],value:val,depth:depth,children:[]}}}),roots=[],depth=1;depth<=max_depth;depth++)$.each(choices,function(){var parent=this;parent.depth==depth&&(1===depth&&roots.push(this),$.each(choices,function(){var child=this;child.depth==depth+1&&child.label.match("^"+parent.label)==parent.label&&parent.children.push(child)}))});options.hideOriginal&&obj.hide(),obj.wrap('<span class="drilldown-wrapper" />'),obj.after('<select class="form-control drilldown drilldown-1"><option disabled selected value="">'+options.placeholder+"</option></select>");var root_select=obj.next();root_select.data("depth",1),$.each(roots,function(){var opt=$("<option>");opt.val(this.value),opt.text(this.short_label),opt.data("node",this),root_select.append(opt)});var change_handler=function change_handler(){var this_select=$(this),opt=this_select.find("option:selected"),node=opt.data("node");if(this_select.val()?obj.val(this_select.val()):this_select.data("depth")>1?obj.val(this_select.prev().val()):obj.val(""),this_select.nextAll("select").remove(),node&&node.children.length>0){this_select.after('<select class="form-control drilldown"><option selected disabled value="">'+options.placeholder+"</option></select>");var next_select=this_select.next();next_select.addClass("drilldown-"+(node.depth+1)),next_select.data("depth",node.depth+1),$.each(node.children,function(){var opt=$("<option>");opt.val(this.value),opt.text(this.short_label),opt.data("node",this),next_select.append(opt)}),next_select.change(change_handler)}};root_select.change(change_handler);var choices_by_short_label={};$.each(choices,function(){choices_by_short_label[this.short_label]=this});var selected_label=obj.find(" option:selected").text();selected_label.split(options.separator)}}(jQuery),$(document).ready(function(){!function(){$.get("https://openrov.zendesk.com/embeddable/ticket_fields?locale=en").done(function(fieldIdsResult){fieldIdsResult.forEach(function(field){if("text"==field.type&&"Name"==field.title_in_portal&&$("#nameInput").data("id",field.id),24180405==field.id){var topLevelControl=$("#modal-contactSupport #typeInput");$("#modal-contactSupport #typeInput").data("id",field.id);var done={},elements=field.custom_field_options.map(function(option){for(var res=[],parts=option.name.split("::"),breadCrumbs=[],i=0;i<parts.length;i++){breadCrumbs.push(parts[i]);var joined=breadCrumbs.join(" &gt; ");if(!done[joined]){done[joined]={};var value=i===parts.length-1?option.value:void 0;res.push('<option value="'+value+'">'+joined+"</option>")}}return res.join(" ")});topLevelControl.append(elements),topLevelControl.selectHierarchy({hideOriginal:!0,placeholder:" -- select an option -- "})}})});var submitedFrom="\n\n------------------\nSubmitted from: "+location;$("#modal-contactSupport input[type=submit]").on("click",function(ev){ev.preventDefault(),$("#modal-contactSupport #nameInput").parent().toggleClass("has-danger",!1),$("#modal-contactSupport #emailInput").parent().toggleClass("has-danger",!1),$("#modal-contactSupport #subjectInput").parent().toggleClass("has-danger",!1),$("#modal-contactSupport #descriptionInput").parent().toggleClass("has-danger",!1),$("#modal-contactSupport .drilldown").parent().parent().toggleClass("has-danger",!1);var error=!1;try{var name=$("#nameInput").val();0==name.trim().length&&($("#nameInput").parent().toggleClass("has-danger",!0),error=!0);var email=$("#emailInput").val();0==email.trim().length&&($("#emailInput").parent().toggleClass("has-danger",!0),error=!0);var subject=$("#subjectInput").val();0==subject.trim().length&&($("#subjectInput").parent().toggleClass("has-danger",!0),error=!0);var description=$("#descriptionInput").val();0==description.trim().length&&($("#descriptionInput").parent().toggleClass("has-danger",!0),error=!0);var type="",drillDowns=$("#modal-contactSupport .drilldown");$(drillDowns[drillDowns.length-1]).children().toArray().forEach(function(child){child.selected&&child.value&&(type=child.value)}),0==type.trim().length&&($(drillDowns[drillDowns.length-1]).parent().parent().toggleClass("has-danger",!0),error=!0);var nameId=$("#nameInput").data("id"),typeId=$("#typeInput").data("id"),request={subject:subject,tags:["web_widget"],via_id:48,comment:{body:description+submitedFrom},requester:{name:name,email:email,locale_id:1},fields:{}};if(request.fields[nameId]=name,request.fields[typeId]=type,error)return;$("#submitter").prop("disabled",!0),$.ajax({type:"POST",url:"https://openrov.zendesk.com/api/v2/requests.json",data:JSON.stringify({request:request}),dataType:"json",contentType:"application/json",beforeSend:function(xhr){xhr.setRequestHeader("Authorization","Basic "+btoa(email+"/token:BO4MEQQtX70i6kDJqFmUb5voRNo8OPs2qcyGISBz"))}}).done(function(res){$("#contact-support-success").removeClass("d-none")}).fail(function(err){$("#contact-support-error").removeClass("d-none"),window.trackJavaScriptError&&window.trackJavaScriptError(err,"Contact support form")})}catch(err){return void console.error(err)}})}()}),$(document).ready(function(){var $form=$("#mc-embedded-subscribe-form");$form.length>0&&$form.find('input[type="submit"]').bind("click",function(event){event&&event.preventDefault(),validate_input($form)?($(this).attr("disabled",!0),$form.find(".form-group.email").removeClass("has-warning"),register($form)):$form.find(".form-group.email").addClass("has-warning")})});var videos=$(".video-container.mouseover-play");videos.on("mouseover",function(ev){$(this).addClass("play");var video=$(this).find(".card-video");$(this).find(".card-img").css("opacity",0),video.css("opacity",1),video.get(0).play()}).on("mouseout",function(ev){$(this).removeClass("play"),$(this).find(".card-video")[0].pause()}),videos.append('<div class="video-fullscreen"><i class="fa fa-arrows-alt" aria-hidden="true"></i></div>'),videos.append('<div class="card-video-control"><span class="fa fa-play-circle-o play" aria-hidden="true"></span><span class="fa fa-pause-circle-o pause" aria-hidden="true"></span></div>'),videos.append('<div class="video-loading-indicator invisible"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'),videos.find(".video-fullscreen").click(function(){$(this).parent().find("video").get(0).requestFullscreen()}),videos.find("video").each(function(i,video){video.onwaiting=function(){$(video).parent().find(".video-loading-indicator").removeClass("invisible")},video.onplaying=function(){$(video).parent().find(".video-loading-indicator").addClass("invisible")}});