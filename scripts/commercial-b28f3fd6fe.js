"use strict";!function($){function closeBackdrop(backdrop){backdrop.removeClass("show"),setTimeout(function(){return backdrop.remove()},500)}function send(email,name,phone,company,industry,description,website){var body="Commercial contact form \n----------------------------------\nName: "+name+"\nEMail: "+email+"\nPhone: "+phone+"\nCompany: "+company+"\nIndustry: "+industry+"\nWebsite: "+website+"\nDescription:\n"+description+"\n\n",request={subject:"[Commercial Contact] By "+name,tags:["web","request","commercial"],via_id:48,comment:{body:body},requester:{name:name,email:email,locale_id:1},fields:{}};return $.ajax({type:"POST",url:"https://openrov.zendesk.com/api/v2/requests.json",data:JSON.stringify({request:request}),dataType:"json",contentType:"application/json",beforeSend:function(xhr){xhr.setRequestHeader("Authorization","Basic "+btoa(email+"/token:BO4MEQQtX70i6kDJqFmUb5voRNo8OPs2qcyGISBz"))}})}var sentIds=[];$(".contact-us").click(function(){$("#email").animate({left:0,duration:"slow",complete:function(){return $("#email").focus()}})});var form=(new Waypoint({element:$(".contact-cta").get(0),handler:function(direction){"down"==direction?($("body").append('<div class="modal-backdrop cta hidden-sm-down"></div>'),setTimeout(function(){$(".modal-backdrop.cta").addClass("show").click(function(){closeBackdrop($(this))})},1)):closeBackdrop($(".modal-backdrop.cta"))},offset:"bottom-in-view"}),$("#form"));form.find("#uniqueId").val((new Date).valueOf()),form.find("#send").on("click",function(ev){ev.preventDefault();var uniqueIdField=form.find("#uniqueId"),uniqueId=uniqueIdField.val();if(!(sentIds.indexOf(uniqueId)>=0)){sentIds.push(uniqueId),form.find("#email").parent().toggleClass("has-danger",!1),form.find("#phone").parent().toggleClass("has-danger",!1),form.find("#name").parent().toggleClass("has-danger",!1),form.find("#company").parent().toggleClass("has-danger",!1),form.find("#industry").parent().toggleClass("has-danger",!1),form.find("#website").parent().toggleClass("has-danger",!1),form.find("#send").prop("disabled",!0);var error=!1;try{var email=form.find("#email").val();0==email.trim().length&&(form.find("#email").parent().toggleClass("has-danger",!0),error=!0);var name=form.find("#name").val();0==name.trim().length&&(form.find("#name").parent().toggleClass("has-danger",!0),error=!0);var phone=form.find("#phone").val(),company=form.find("#company").val(),industry=form.find("#industry").val(),description=form.find("#description").val(),website=form.find("#website").val();if(error)return;send(email,name,phone,company,industry,description,website).done(function(res){alert("Thank you for your contact request. You will hear from us shortly."),form.find("#send").prop("disabled",!1),uniqueIdField.val((new Date).valueOf())}).fail(function(err){alert("Whoops, something went wrong. Please try again later."),form.find("#send").prop("disabled",!1),uniqueIdField.val((new Date).valueOf())})}catch(err){return void console.error(err)}}})}($);