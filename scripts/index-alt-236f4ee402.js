"use strict";function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}if(!info.done)return Promise.resolve(value).then(function(value){step("next",value)},function(err){step("throw",err)});resolve(value)}return step("next")})}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function objectifyForm(formArray){for(var returnArray={},i=0;i<formArray.length;i++)returnArray[formArray[i].name]=formArray[i].value;return returnArray}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),BuyScreen=function(){function BuyScreen(productId,savings,collectionId){_classCallCheck(this,BuyScreen),this.productId=productId,this.savings=savings||200,this.collectionId=collectionId||"5a85077f52f74d1400346dce"}return _createClass(BuyScreen,[{key:"isEmail",value:function(email){return/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email)}},{key:"getData",value:function(formData){var address={first_name:formData.firstName,last_name:formData.lastName,company:null,line1:formData.address1,line2:formData.address2,city:formData.city,state:"US"===formData.country?formData.usState.toLowerCase():formData.state,zip:formData.zip,country:formData.country.toLowerCase(),phone:formData.phone},lineItems=[];this.productId&&lineItems.push({product_id:this.productId,variant_id:formData.variant,quantity:parseInt(formData.quantity)});for(var prop in formData)prop.startsWith("accessory")&&lineItems.push({product_id:formData[prop],"quantity:":parseInt(formData.quantity||1)});return{user_id:"5637c8d966e9ec03008989ef",buyer:{email:formData.email,first_name:formData.firstName,last_name:formData.lastName,phone:formData.phone,notes:formData.notes+" #### How will you use Trident: "+formData.useForTrident},shipping_address:address,billing_address:Object.assign({},address,{zip:formData.billingZip}),line_items:lineItems,payment_source:{},discount_codes:[formData.couponCode]}}},{key:"getPaymentData",value:function(formData){return{card:{name:formData.firstName+" "+formData.lastName,number:formData.ccNumber,exp_month:formData.expDateMonth,exp_year:formData.expDateYear,cvc:formData.cvc}}}},{key:"getVariant",value:function(formData,variants){var selectedVariants=[];for(var item in formData)item.startsWith("option_")&&selectedVariants.push(formData[item]);selectedVariants=selectedVariants.sort();var _iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,_iterator=variants[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){var v=_step.value;if(v.options.ids.sort().join()===selectedVariants.join())return v.id}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{!_iteratorNormalCompletion&&_iterator.return&&_iterator.return()}finally{if(_didIteratorError)throw _iteratorError}}}},{key:"calculateShipping",value:function(form){var formData=objectifyForm(form.serializeArray());formData.couponCode=form.find("#couponCode").val();var data=this.getData(formData),quantityField=form.find("#quantity"),itemsOrdered=parseInt(quantityField.length>0?quantityField.val():0);for(var prop in formData)prop.startsWith("accessory")&&itemsOrdered++;$("#quantityOrdered").text(itemsOrdered);var valueLabel=1===itemsOrdered?"item":"items";return $("#itemsLabel").text(valueLabel),form.find("#savings").text((this.savings*itemsOrdered).toFixed(2)),this._calculateShipping(data,form)}},{key:"_calculateShipping",value:function(){function _calculateShipping(_x,_x2){return _ref.apply(this,arguments)}var _ref=_asyncToGenerator(regeneratorRuntime.mark(function _callee(data,form){var result;return regeneratorRuntime.wrap(function(_context){for(;;)switch(_context.prev=_context.next){case 0:return form.find("tfoot").addClass("calculating"),_context.next=3,$.ajax({async:!0,crossDomain:!0,url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/calculate-shipping",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(data)});case 3:result=_context.sent,form.find("#shipping").text("$"+(result.shipping/100).toFixed(2)),result.discount>0?($("#discount-container").removeClass("d-none"),$("#discount").text("$"+(result.discount/100).toFixed(2))):$("#discount-container").addClass("d-none"),result.discounts&&result.discounts.length>0&&(form.find("#couponCode").attr("disabled",!0),form.find("#applyDiscount").addClass("btn-success").attr("disabled",!0),result.discounts.filter(function(d){return 1==d.free_shipping}).length>0&&(form.find("#freeShipping").removeClass("d-none"),form.find("#shippingContainer").addClass("d-none"))),form.find("#tax").text("$"+(result.taxes/100).toFixed(2)),form.find("#total").text("$"+(result.total/100).toFixed(2)),form.find("#totalExSaving").text("$"+(result.total/100+this.savings).toFixed(2)),form.find("tfoot").removeClass("calculating");case 11:case"end":return _context.stop()}},_callee,this)}));return _calculateShipping}()},{key:"getOptionText",value:function(value){var result=value.replace(/\([+$0-9].*\)/,"").trim();return"None"==result?"":(result.indexOf("Standard")>-1?result=result:result.indexOf("100m")>-1&&(result="Standard 25m + "+result),'<span class="text-nowrap">'+(result=result.replace(/Add A/,""))+"</span>")}},{key:"getOptions",value:function(values){var _this=this;return values.map(function(val){return _this.getOptionText(val)}).filter(function(val){return 0!=val.trim().length}).join(" +&nbsp;")}},{key:"countryChanged",value:function(target){target&&("US"===target.options[target.selectedIndex].value?(this.orderForm.find("#usState").parent().removeClass("d-none").attr("required",!1),this.orderForm.find("#state").parent().addClass("d-none")):(this.orderForm.find("#state").parent().removeClass("d-none"),this.orderForm.find("#usState").parent().addClass("d-none").attr("required",!1)),this.orderForm.validator("update"),this.calculateShipping(this.orderForm))}},{key:"setupForm",value:function(){function setupForm(_x3){return _ref2.apply(this,arguments)}var _ref2=_asyncToGenerator(regeneratorRuntime.mark(function _callee2(orderForm){var result,trident,i,optionsHtml,accessoriesHtml,accessoriesHeader,formData,data,country,variant,checked,newItem,_this2=this;return regeneratorRuntime.wrap(function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return _context2.next=2,$.ajax({url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/collections/"+this.collectionId});case 2:for(result=_context2.sent,trident=null,i=0;i<result.data.products.length;i++)result.data.products[i]._id==this.productId&&(trident=result.data.products[i]);return optionsHtml="",this.productId?($("#description").html(trident.description),optionsHtml=trident.variants.reverse().map(function(v,idx){var price=v.price/100;return'<tr class="product-row" data-product-option="'+v.options.values.join(" + ")+'"><td class="product-selector product"><input type="radio" value="'+v.id+'" name="variant" '+(0===idx?"checked":"")+'></td><td class="product-info product text-center text-md-left "><span class="font-weight-bold">Trident Underwater Drone</span> <br class="d-sm-none">+&nbsp;'+_this2.getOptions(v.options.values)+'<div class="d-sm-none price-sm pt-3"><em><small><s class="pr-2">$'+(price+_this2.savings).toFixed(2)+"</s></small></em>&nbsp;$"+price.toFixed(2)+'</div></td><td class="text-right product pricing d-none d-md-table-cell"><em><small><s  class="pr-2">$'+(price+_this2.savings).toFixed(2)+"</s></small></em>$"+price.toFixed(2)+"</td></tr>"}).join("")):$("#description").html(""),accessoriesHtml=result.data.products.map(function(product,idx){if(product._id!=_this2.productId)return'<tr class="accessory-row"><td class="product-selector product"><input type="checkbox" name="accessory_'+product._id+'" value="'+product._id+'"></td><td class="product-info accessory product text-center text-md-left ">'+(product.images.length>0?'<span class="accessory-image mr-3 d-none d-md-flex" style="background-image:url('+product.images[0].url+');"></span>':"")+'<div><span class="font-weight-bold">'+product.name+'</span><br><div class="readmore">'+product.description+"</div>"+(product.images.length>0?'<div class="d-sm-none d-flex justify-content-center"><span class="accessory-image mr-3 d-flex" style="background-image:url('+product.images[0].url+');"></span></div>':"")+'<div class="d-sm-none price-sm pt-3">&nbsp;$'+(product.price/100).toFixed(2)+'</div></div></td><td class="text-right product pricing d-none d-md-table-cell">$'+(product.price/100).toFixed(2)+"</td></tr>"}),accessoriesHeader='<tr><td colspan="4"><h3 class="pt-3">Accessories</h3></td></tr>',this.productId?orderForm.find("#options").prepend(optionsHtml+accessoriesHeader+accessoriesHtml):orderForm.find("#options").prepend(accessoriesHeader+accessoriesHtml),orderForm.find("#savingsContainer").removeClass("d-none"),$(".readmore").readmore({collapsedHeight:25}),formData=objectifyForm(orderForm.serializeArray()),formData.country="us",data=this.getData(formData),this._calculateShipping(data,orderForm),country=orderForm.find("#country"),country||(country=$("#country")),country.attr("data-store-loaded")||country.val("US"),this.countryChanged(country.get(0)),country.change(function(ev){_this2.countryChanged(ev.target)}),orderForm.find("#zip").change(function(ev){_this2.calculateShipping(orderForm)}),orderForm.find("#usState").change(function(ev){_this2.calculateShipping(orderForm)}),orderForm.find("#quantity").change(function(ev){_this2.calculateShipping(orderForm)}),orderForm.find("#savings").text(this.savings.toFixed(2)),orderForm.find("#ccNumber").keypress(function(event){String.fromCharCode(event.which).match(/[0-9- ]/)||event.preventDefault()}),orderForm.find("tr.product-row").click(function(ev){var checked=orderForm.find('input[type=radio][name="variant"][checked]')[0];checked&&checked.removeAttribute("checked");var newItem=$(ev.target).parent().find('input[type=radio][name="variant"]')[0];newItem&&newItem.setAttribute("checked","checked"),_this2.calculateShipping(orderForm);var value=orderForm.find('input[type=radio][name="variant"][checked]').val();localStorage.setItem("buyNow.productVariant",value)}),orderForm.find("tr.accessory-row").click(function(ev){_this2.calculateShipping(orderForm)}),orderForm.on("valid.bs.validator",function(ev){ev.relatedTarget.checkValidity()&&$(ev.relatedTarget).parent().removeClass("has-danger").removeClass("has-error")}).on("invalid.bs.validator",function(ev){console.log(ev.relatedTarget.id+" "+ev.detail),ev.relatedTarget.checkValidity()||$(ev.relatedTarget).parent().addClass("has-danger").addClass("has-error")}),variant=localStorage.getItem("buyNow.productVariant"),variant&&(checked=orderForm.find('input[type=radio][name="variant"][checked]')[0],checked&&checked.removeAttribute("checked"),newItem=orderForm.find('input[type=radio][name="variant"][value='+variant+"]")[0],newItem&&newItem.setAttribute("checked","checked"),this.calculateShipping(orderForm)),_context2.abrupt("return",result.data.variants);case 32:case"end":return _context2.stop()}},_callee2,this)}));return setupForm}()},{key:"setCookie",value:function(cname,cvalue,exdays){var d=new Date;d.setTime(d.getTime()+24*exdays*60*60*1e3);var expires="expires="+d.toUTCString();document.cookie=cname+"="+cvalue+";"+expires+";path=/"}},{key:"submit",value:function(){function submit(){return _ref3.apply(this,arguments)}var _ref3=_asyncToGenerator(regeneratorRuntime.mark(function _callee3(){var orderForm,billingForm,variants,formData,data,paymentData,result,order,total,currency,line_items,path,utmSource,utmMedium;return regeneratorRuntime.wrap(function(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:return $(window).off("beforeunload"),orderForm=this.orderForm,billingForm=this.billingForm,variants=this.variants,billingForm.find("#order").attr("disabled",!0).addClass("btn-secondary"),billingForm.find("#orderProcessing").show(),formData=objectifyForm(orderForm.serializeArray()),formData.couponCode=orderForm.find("#couponCode").val(),data=this.getData(formData),paymentData=objectifyForm(billingForm.serializeArray()),paymentData.firstName=formData.firstName,paymentData.lastName=formData.lastName,data.payment_source=this.getPaymentData(paymentData),_context3.prev=11,_context3.next=14,$.ajax({async:!0,crossDomain:!0,url:"https://api.trycelery.com/v2/orders/checkout",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(data)});case 14:result=_context3.sent,order=result.data,total=order.total/100,currency=order.currency,line_items=order.line_items.map(function(item){return item.celery_sku}).join(","),path="?number="+order.number+"&amount="+total+"&currency="+currency+"&line_items="+line_items,utmSource=this.getQueryStringValue("utm_source"),utmMedium=this.getQueryStringValue("utm_medium"),utmSource&&(path+="&utm_source="+encodeURIComponent(utmSource)),utmMedium&&(path+="&utm_medium="+encodeURIComponent(utmMedium)),this.clearStorage(),document.__isSubmitted=!0,this.setCookie("order",JSON.stringify({number:order.number,total:order.total,taxes:order.taxes,shipping:order.shipping,line_items:order.line_items.map(function(item){return{celery_sku:item.celery_sku,variant_name:item.variant_name,price:item.price,quantity:item.quantity}})}),2),window.location.replace(window.location.href.replace(window.location.search,"")+"../confirmation/"+path),_context3.next=37;break;case 30:_context3.prev=30,_context3.t0=_context3.catch(11),billingForm.find(".alert .title").text(_context3.t0.statusText),billingForm.find(".alert .description").text(_context3.t0.responseJSON.data),billingForm.find(".alert").show(),billingForm.find("#orderProcessing").hide(),billingForm.find("#order").attr("disabled",!1).removeClass("btn-secondary");case 37:case"end":return _context3.stop()}},_callee3,this,[[11,30]])}));return submit}()},{key:"getQueryStringValue",value:function(key){return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]"+encodeURIComponent(key).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1"))}},{key:"runSetupForm",value:function(){function runSetupForm(){return _ref4.apply(this,arguments)}var _ref4=_asyncToGenerator(regeneratorRuntime.mark(function _callee4(){return regeneratorRuntime.wrap(function(_context4){for(;;)switch(_context4.prev=_context4.next){case 0:return _context4.next=2,this.setupForm(this.orderForm);case 2:this.variants=_context4.sent,this.orderForm.validator("update");case 4:case"end":return _context4.stop()}},_callee4,this)}));return runSetupForm}()},{key:"clearStorage",value:function(){if(localStorage)for(var i=0;i<=localStorage.length;i++){var key=localStorage.key(i);key&&localStorage.removeItem(key)}}},{key:"setupStorage",value:function(){var _this3=this;localStorage&&$("[data-store]").on("change",function(ev){var target=ev.currentTarget;"INPUT"===target.tagName&&localStorage.setItem("buyNow."+target.id,$(target).val()),"SELECT"===target.tagName&&localStorage.setItem("buyNow."+target.id,$(target).val())}).each(function(i,e){if("INPUT"===e.tagName&&$(e).val(localStorage.getItem("buyNow."+e.id)),"SELECT"===e.tagName){var value=localStorage.getItem("buyNow."+e.id);value&&$(e).val(value).attr("data-store-loaded","true")}"couponCode"===e.id&&_this3.calculateShipping(_this3.orderForm)})}},{key:"sendAbandondedEmail",value:function(){function sendAbandondedEmail(){return _ref5.apply(this,arguments)}var _ref5=_asyncToGenerator(regeneratorRuntime.mark(function _callee5(){var email,data,result;return regeneratorRuntime.wrap(function(_context5){for(;;)switch(_context5.prev=_context5.next){case 0:if(email=this.orderForm.find("#email"),!this.isEmail(email.val())){_context5.next=12;break}return data={email_address:email.val(),status:"subscribed",merge_fields:{FNAME:this.orderForm.find("#firstName").val(),LNAME:this.orderForm.find("#lastName").val()}},_context5.prev=3,_context5.next=6,$.ajax({async:!0,crossDomain:!0,url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/mailchimp/abbandoned-card",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(data)});case 6:result=_context5.sent,_context5.next=12;break;case 9:_context5.prev=9,_context5.t0=_context5.catch(3),console.error("Could not add email address");case 12:case"end":return _context5.stop()}},_callee5,this,[[3,9]])}));return sendAbandondedEmail}()},{key:"setupAbandonedCart",value:function(){var _this4=this;this.orderForm.find("#email");$(window).on("beforeunload",function(ev){document.__isSubmitted||_this4.sendAbandondedEmail();ev.returnValue=void 0})}},{key:"init",value:function(){var _this5=this;this.orderForm=$("form#orderForm"),this.billingForm=$("form#billingForm");var self=this;this.billingForm.validator().find("#order").click(function(ev){if(ev.preventDefault(),void 0!==self.variants){if(_this5.billingForm.validator("validate"),!self.billingForm[0].checkValidity())return self.billingForm.find(".alert .title").text("Billing information."),self.billingForm.find(".alert .description").text("Please check your billing information."),void self.billingForm.find(".alert").show();_this5.submit()}}),this.orderForm.find("#applyDiscount").click(function(ev){_this5.calculateShipping(_this5.orderForm)}),this.orderForm.find("#enterBilling").click(function(ev){ev.preventDefault(),_this5.orderForm.validator("validate"),_this5.orderForm[0].checkValidity()&&(_this5.orderForm.find("#shippingInformation").fadeOut(function(){_this5.billingForm.find("#billingInformation").fadeIn()}),_this5.setupAbandonedCart())}),this.billingForm.find("#goBack").click(function(){_this5.billingForm.find("#billingInformation").fadeOut(function(){_this5.orderForm.find("#shippingInformation").fadeIn()})}),$("#orderFormContainer").removeClass("invisible"),$("#loader-wrapper").addClass("loaded"),this.setupStorage(),this.runSetupForm()}}]),BuyScreen}(),PRODUCT="588166666939d112008a2263";!function(){var _$$slick;new BuyScreen(PRODUCT,450).init();var pageHeader=$(".page-header");pageHeader.length>0&&$(window).scroll(function(){$(document).scrollTop()>pageHeader.position().top?pageHeader.find(".sub-nav").addClass("fixed-top"):pageHeader.find(".sub-nav").removeClass("fixed-top")}),$(".slider-for").slick({slidesToShow:1,slidesToScroll:1,arrows:!0,fade:!0,asNavFor:".slider-nav",swipeToSlide:!0});$(".slider-nav").slick((_$$slick={slidesToShow:2,slidesToScroll:1,centerMode:!0,asNavFor:".slider-for",dots:!1},_defineProperty(_$$slick,"centerMode",!1),_defineProperty(_$$slick,"focusOnSelect",!0),_$$slick));$(".slider-for").on("beforeChange",function(evt,slick,current,next){$(".slider-nav").slick("slickGoTo",next)}),$(document).ready(function(){YT.ready(function(){$("iframe.youtube").each(function(idx,element){var player=void 0;player=new YT.Player(element,{events:{onStateChange:function(status){0===status.data&&(player.seekTo(0),player.pauseVideo(),$(element).closest(".slick").slick("slickNext"))}}})})})})}();