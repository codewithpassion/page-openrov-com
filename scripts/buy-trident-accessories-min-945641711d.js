"use strict";function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,i){try{var o=t[a](i),s=o.value}catch(e){return void n(e)}if(!o.done)return Promise.resolve(s).then(function(e){r("next",e)},function(e){r("throw",e)});e(s)}return r("next")})}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function objectifyForm(e){for(var t={},n=0;n<e.length;n++)t[e[n].name]=e[n].value;return t}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),BuyScreen=function(){function e(t,n,r){_classCallCheck(this,e),this.productId=t,this.savings=n||200,this.collectionId=r||"5a85077f52f74d1400346dce"}return _createClass(e,[{key:"isEmail",value:function(e){return/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(e)}},{key:"getData",value:function(e){var t={first_name:e.firstName,last_name:e.lastName,company:null,line1:e.address1,line2:e.address2,city:e.city,state:"US"===e.country?e.usState.toLowerCase():e.state,zip:e.zip,country:e.country.toLowerCase(),phone:e.phone},n=[];this.productId&&n.push({product_id:this.productId,variant_id:e.variant,quantity:parseInt(e.quantity)});for(var r in e)r.startsWith("accessory")&&n.push({product_id:e[r],"quantity:":parseInt(e.quantity||1)});return{user_id:"5637c8d966e9ec03008989ef",buyer:{email:e.email,first_name:e.firstName,last_name:e.lastName,phone:e.phone,notes:e.notes+" #### How will you use Trident: "+e.useForTrident},shipping_address:t,billing_address:Object.assign({},t,{zip:e.billingZip}),line_items:n,payment_source:{},discount_codes:[e.couponCode]}}},{key:"getPaymentData",value:function(e){return{card:{name:e.firstName+" "+e.lastName,number:e.ccNumber,exp_month:e.expDateMonth,exp_year:e.expDateYear,cvc:e.cvc}}}},{key:"getVariant",value:function(e,t){var n=[];for(var r in e)r.startsWith("option_")&&n.push(e[r]);n=n.sort();var a=!0,i=!1,o=void 0;try{for(var s,c=t[Symbol.iterator]();!(a=(s=c.next()).done);a=!0){var d=s.value;if(d.options.ids.sort().join()===n.join())return d.id}}catch(e){i=!0,o=e}finally{try{!a&&c.return&&c.return()}finally{if(i)throw o}}}},{key:"calculateShipping",value:function(e){var t=objectifyForm(e.serializeArray());t.couponCode=e.find("#couponCode").val();var n=this.getData(t),r=e.find("#quantity"),a=parseInt(r.length>0?r.val():0);for(var i in t)i.startsWith("accessory")&&a++;$("#quantityOrdered").text(a);var o=1===a?"item":"items";return $("#itemsLabel").text(o),e.find("#savings").text((this.savings*a).toFixed(2)),this._calculateShipping(n,e)}},{key:"_calculateShipping",value:function(){function e(e,n){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t,n){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n.find("tfoot").addClass("calculating"),e.next=3,$.ajax({async:!0,crossDomain:!0,url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/calculate-shipping",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(t)});case 3:r=e.sent,n.find("#shipping").text("$"+(r.shipping/100).toFixed(2)),r.discount>0?($("#discount-container").removeClass("d-none"),$("#discount").text("$"+(r.discount/100).toFixed(2))):$("#discount-container").addClass("d-none"),r.discounts&&r.discounts.length>0&&(n.find("#couponCode").attr("disabled",!0),n.find("#applyDiscount").addClass("btn-success").attr("disabled",!0),r.discounts.filter(function(e){return 1==e.free_shipping}).length>0&&(n.find("#freeShipping").removeClass("d-none"),n.find("#shippingContainer").addClass("d-none"))),n.find("#tax").text("$"+(r.taxes/100).toFixed(2)),n.find("#total").text("$"+(r.total/100).toFixed(2)),n.find("#totalExSaving").text("$"+(r.total/100+this.savings).toFixed(2)),n.find("tfoot").removeClass("calculating");case 11:case"end":return e.stop()}},e,this)}));return e}()},{key:"getOptionText",value:function(e){var t=e.replace(/\([+$0-9].*\)/,"").trim();return"None"==t?"":(t.indexOf("Standard")>-1?t=t:t.indexOf("100m")>-1&&(t="Standard 25m + "+t),'<span class="text-nowrap">'+(t=t.replace(/Add A/,""))+"</span>")}},{key:"getOptions",value:function(e){var t=this;return e.map(function(e){return t.getOptionText(e)}).filter(function(e){return 0!=e.trim().length}).join(" +&nbsp;")}},{key:"countryChanged",value:function(e){e&&("US"===e.options[e.selectedIndex].value?(this.orderForm.find("#usState").parent().removeClass("d-none").attr("required",!1),this.orderForm.find("#state").parent().addClass("d-none")):(this.orderForm.find("#state").parent().removeClass("d-none"),this.orderForm.find("#usState").parent().addClass("d-none").attr("required",!1)),this.orderForm.validator("update"),this.calculateShipping(this.orderForm))}},{key:"setupForm",value:function(){function e(e){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var n,r,a,i,o,s,c,d,l,u,p,f,m=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$.ajax({url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/collections/"+this.collectionId});case 2:for(n=e.sent,r=null,a=0;a<n.data.products.length;a++)n.data.products[a]._id==this.productId&&(r=n.data.products[a]);return i="",this.productId?($("#description").html(r.description),i=r.variants.reverse().map(function(e,t){var n=e.price/100;return'<tr class="product-row" data-product-option="'+e.options.values.join(" + ")+'"><td class="product-selector product"><input type="radio" value="'+e.id+'" name="variant" '+(0===t?"checked":"")+'></td><td class="product-info product text-center text-md-left "><span class="font-weight-bold">Trident Underwater Drone</span> <br class="d-sm-none">+&nbsp;'+m.getOptions(e.options.values)+'<div class="d-sm-none price-sm pt-3"><em><small><s class="pr-2">$'+(n+m.savings).toFixed(2)+"</s></small></em>&nbsp;$"+n.toFixed(2)+'</div></td><td class="text-right product pricing d-none d-md-table-cell"><em><small><s  class="pr-2">$'+(n+m.savings).toFixed(2)+"</s></small></em>$"+n.toFixed(2)+"</td></tr>"}).join("")):$("#description").html(""),o=n.data.products.map(function(e,t){if(e._id!=m.productId)return'<tr class="accessory-row"><td class="product-selector product"><input type="checkbox" name="accessory_'+e._id+'" value="'+e._id+'"></td><td class="product-info accessory product text-center text-md-left ">'+(e.images.length>0?'<span class="accessory-image mr-3 d-none d-md-flex" style="background-image:url('+e.images[0].url+');"></span>':"")+'<div><span class="font-weight-bold">'+e.name+'</span><br><div class="readmore">'+e.description+"</div>"+(e.images.length>0?'<div class="d-sm-none d-flex justify-content-center"><span class="accessory-image mr-3 d-flex" style="background-image:url('+e.images[0].url+');"></span></div>':"")+'<div class="d-sm-none price-sm pt-3">&nbsp;$'+(e.price/100).toFixed(2)+'</div></div></td><td class="text-right product pricing d-none d-md-table-cell">$'+(e.price/100).toFixed(2)+"</td></tr>"}),s='<tr><td colspan="4"><h3 class="pt-3">Accessories</h3></td></tr>',this.productId?t.find("#options").prepend(i+s+o):t.find("#options").prepend(s+o),t.find("#savingsContainer").removeClass("d-none"),$(".readmore").readmore({collapsedHeight:25}),c=objectifyForm(t.serializeArray()),c.country="us",d=this.getData(c),this._calculateShipping(d,t),l=t.find("#country"),l||(l=$("#country")),l.attr("data-store-loaded")||l.val("US"),this.countryChanged(l.get(0)),l.change(function(e){m.countryChanged(e.target)}),t.find("#zip").change(function(e){m.calculateShipping(t)}),t.find("#usState").change(function(e){m.calculateShipping(t)}),t.find("#quantity").change(function(e){m.calculateShipping(t)}),t.find("#savings").text(this.savings.toFixed(2)),t.find("#ccNumber").keypress(function(e){String.fromCharCode(e.which).match(/[0-9- ]/)||e.preventDefault()}),t.find("tr.product-row").click(function(e){var n=t.find('input[type=radio][name="variant"][checked]')[0];n&&n.removeAttribute("checked");var r=$(e.target).parent().find('input[type=radio][name="variant"]')[0];r&&r.setAttribute("checked","checked"),m.calculateShipping(t);var a=t.find('input[type=radio][name="variant"][checked]').val();localStorage.setItem("buyNow.productVariant",a)}),t.find("tr.accessory-row").click(function(e){m.calculateShipping(t)}),t.on("valid.bs.validator",function(e){e.relatedTarget.checkValidity()&&$(e.relatedTarget).parent().removeClass("has-danger").removeClass("has-error")}).on("invalid.bs.validator",function(e){console.log(e.relatedTarget.id+" "+e.detail),e.relatedTarget.checkValidity()||$(e.relatedTarget).parent().addClass("has-danger").addClass("has-error")}),u=localStorage.getItem("buyNow.productVariant"),u&&(p=t.find('input[type=radio][name="variant"][checked]')[0],p&&p.removeAttribute("checked"),f=t.find('input[type=radio][name="variant"][value='+u+"]")[0],f&&f.setAttribute("checked","checked"),this.calculateShipping(t)),e.abrupt("return",n.data.variants);case 32:case"end":return e.stop()}},e,this)}));return e}()},{key:"setCookie",value:function(e,t,n){var r=new Date;r.setTime(r.getTime()+24*n*60*60*1e3);var a="expires="+r.toUTCString();document.cookie=e+"="+t+";"+a+";path=/"}},{key:"submit",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,n,r,a,i,o,s,c,d,l,u,p,f,m;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return $(window).off("beforeunload"),t=this.orderForm,n=this.billingForm,r=this.variants,n.find("#order").attr("disabled",!0).addClass("btn-secondary"),n.find("#orderProcessing").show(),a=objectifyForm(t.serializeArray()),a.couponCode=t.find("#couponCode").val(),i=this.getData(a),o=objectifyForm(n.serializeArray()),o.firstName=a.firstName,o.lastName=a.lastName,i.payment_source=this.getPaymentData(o),e.prev=11,e.next=14,$.ajax({async:!0,crossDomain:!0,url:"https://api.trycelery.com/v2/orders/checkout",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(i)});case 14:s=e.sent,c=s.data,d=c.total/100,l=c.currency,u=c.line_items.map(function(e){return e.celery_sku}).join(","),p="?number="+c.number+"&amount="+d+"&currency="+l+"&line_items="+u,f=this.getQueryStringValue("utm_source"),m=this.getQueryStringValue("utm_medium"),f&&(p+="&utm_source="+encodeURIComponent(f)),m&&(p+="&utm_medium="+encodeURIComponent(m)),this.clearStorage(),document.__isSubmitted=!0,this.setCookie("order",JSON.stringify({number:c.number,total:c.total,taxes:c.taxes,shipping:c.shipping,line_items:c.line_items.map(function(e){return{celery_sku:e.celery_sku,variant_name:e.variant_name,price:e.price,quantity:e.quantity}})}),2),window.location.replace(window.location.href.replace(window.location.search,"")+"../confirmation/"+p),e.next=37;break;case 30:e.prev=30,e.t0=e.catch(11),n.find(".alert .title").text(e.t0.statusText),n.find(".alert .description").text(e.t0.responseJSON.data),n.find(".alert").show(),n.find("#orderProcessing").hide(),n.find("#order").attr("disabled",!1).removeClass("btn-secondary");case 37:case"end":return e.stop()}},e,this,[[11,30]])}));return e}()},{key:"getQueryStringValue",value:function(e){return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]"+encodeURIComponent(e).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1"))}},{key:"runSetupForm",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setupForm(this.orderForm);case 2:this.variants=e.sent,this.orderForm.validator("update");case 4:case"end":return e.stop()}},e,this)}));return e}()},{key:"clearStorage",value:function(){if(localStorage)for(var e=0;e<=localStorage.length;e++){var t=localStorage.key(e);t&&localStorage.removeItem(t)}}},{key:"setupStorage",value:function(){var e=this;localStorage&&$("[data-store]").on("change",function(e){var t=e.currentTarget;"INPUT"===t.tagName&&localStorage.setItem("buyNow."+t.id,$(t).val()),"SELECT"===t.tagName&&localStorage.setItem("buyNow."+t.id,$(t).val())}).each(function(t,n){if("INPUT"===n.tagName&&$(n).val(localStorage.getItem("buyNow."+n.id)),"SELECT"===n.tagName){var r=localStorage.getItem("buyNow."+n.id);r&&$(n).val(r).attr("data-store-loaded","true")}"couponCode"===n.id&&e.calculateShipping(e.orderForm)})}},{key:"sendAbandondedEmail",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,n,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.orderForm.find("#email"),!this.isEmail(t.val())){e.next=12;break}return n={email_address:t.val(),status:"subscribed",merge_fields:{FNAME:this.orderForm.find("#firstName").val(),LNAME:this.orderForm.find("#lastName").val()}},e.prev=3,e.next=6,$.ajax({async:!0,crossDomain:!0,url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/mailchimp/abbandoned-card",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(n)});case 6:r=e.sent,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(3),console.error("Could not add email address");case 12:case"end":return e.stop()}},e,this,[[3,9]])}));return e}()},{key:"setupAbandonedCart",value:function(){var e=this;this.orderForm.find("#email"),$(window).on("beforeunload",function(t){document.__isSubmitted||e.sendAbandondedEmail(),t.returnValue=void 0})}},{key:"init",value:function(){var e=this;this.orderForm=$("form#orderForm"),this.billingForm=$("form#billingForm");var t=this;this.billingForm.validator().find("#order").click(function(n){if(n.preventDefault(),void 0!==t.variants){if(e.billingForm.validator("validate"),!t.billingForm[0].checkValidity())return t.billingForm.find(".alert .title").text("Billing information."),t.billingForm.find(".alert .description").text("Please check your billing information."),void t.billingForm.find(".alert").show();e.submit()}}),this.orderForm.find("#applyDiscount").click(function(t){e.calculateShipping(e.orderForm)}),this.orderForm.find("#enterBilling").click(function(t){t.preventDefault(),e.orderForm.validator("validate"),e.orderForm[0].checkValidity()&&(e.orderForm.find("#shippingInformation").fadeOut(function(){e.billingForm.find("#billingInformation").fadeIn()}),e.setupAbandonedCart())}),this.billingForm.find("#goBack").click(function(){e.billingForm.find("#billingInformation").fadeOut(function(){e.orderForm.find("#shippingInformation").fadeIn()})}),$("#orderFormContainer").removeClass("invisible"),$("#loader-wrapper").addClass("loaded"),this.setupStorage(),this.runSetupForm()}}]),e}(),PRODUCT=null,collectionId="5a858134f9c1241400d0a886";!function(){new BuyScreen(PRODUCT,0,collectionId).init()}();