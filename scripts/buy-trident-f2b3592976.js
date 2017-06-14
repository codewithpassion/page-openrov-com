"use strict";function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}if(!info.done)return Promise.resolve(value).then(function(value){step("next",value)},function(err){step("throw",err)});resolve(value)}return step("next")})}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function objectifyForm(formArray){for(var returnArray={},i=0;i<formArray.length;i++)returnArray[formArray[i].name]=formArray[i].value;return returnArray}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),PRODUCT="5637ca44df92ea03009633b3",BuyScreen=function(){function BuyScreen(){_classCallCheck(this,BuyScreen)}return _createClass(BuyScreen,[{key:"getData",value:function(formData){var address={first_name:formData.firstName,last_name:formData.lastName,company:null,line1:formData.address1,line2:formData.address2,city:formData.city,state:"US"===formData.country?formData.usState.toLowerCase():formData.state,zip:formData.zip,country:formData.country.toLowerCase(),phone:formData.phone};return{user_id:"5637c8d966e9ec03008989ef",buyer:{email:formData.email,first_name:formData.firstName,last_name:formData.lastName,phone:formData.phone,notes:formData.notes},shipping_address:address,billing_address:Object.assign({},address,{zip:formData.billingZip}),line_items:[{product_id:PRODUCT,variant_id:formData.variant,quantity:parseInt(formData.quantity)}],payment_source:{card:{name:formData.firstName+" "+formData.lastName,number:formData.ccNumber,exp_month:formData.expDate.split("/")[0],exp_year:formData.expDate.split("/")[1],cvc:formData.cvc}},discount_codes:[formData.couponCode]}}},{key:"getVariant",value:function(formData,variants){var selectedVariants=[];for(var item in formData)item.startsWith("option_")&&selectedVariants.push(formData[item]);selectedVariants=selectedVariants.sort();var _iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,_iterator=variants[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){var v=_step.value;if(v.options.ids.sort().join()===selectedVariants.join())return v.id}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{!_iteratorNormalCompletion&&_iterator.return&&_iterator.return()}finally{if(_didIteratorError)throw _iteratorError}}}},{key:"calculateShipping",value:function(form){var formData=objectifyForm(form.serializeArray());formData.couponCode=form.find("#couponCode").val();var data=this.getData(formData);return this._calculateShipping(data,form)}},{key:"_calculateShipping",value:function(){function _calculateShipping(_x,_x2){return _ref.apply(this,arguments)}var _ref=_asyncToGenerator(regeneratorRuntime.mark(function _callee(data,form){var result;return regeneratorRuntime.wrap(function(_context){for(;;)switch(_context.prev=_context.next){case 0:return form.find("tfoot").addClass("calculating"),_context.next=3,$.ajax({async:!0,crossDomain:!0,url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/calculate-shipping",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(data)});case 3:result=_context.sent,form.find("#shipping").text("$"+(result.shipping/100).toFixed(2)),result.discount>0?($("#discount-container").removeClass("hidden-xs-up"),$("#discount").text("$"+(result.discount/100).toFixed(2))):$("#discount-container").addClass("hidden-xs-up"),result.discounts&&result.discounts.length>0&&(form.find("#couponCode").attr("disabled",!0),form.find("#applyDiscount").addClass("btn-success").attr("disabled",!0),result.discounts.filter(function(d){return 1==d.free_shipping}).length>0&&(form.find("#freeShipping").removeClass("d-none"),form.find("#shippingContainer").addClass("d-none"))),form.find("#tax").text("$"+(result.taxes/100).toFixed(2)),form.find("#total").text("$"+(result.total/100).toFixed(2)),form.find("tfoot").removeClass("calculating");case 10:case"end":return _context.stop()}},_callee,this)}));return _calculateShipping}()},{key:"getOptionText",value:function(value){var result=value.replace(/\([+$0-9].*\)/,"").trim();return"None"==result?"":'<span class="text-nowrap">'+(result=result.indexOf("Standard")>-1?result:result.replace(/Add A/,""))+"</span>"}},{key:"getOptions",value:function(values){var _this=this;return values.map(function(val){return _this.getOptionText(val)}).filter(function(val){return 0!=val.trim().length}).join(" +&nbsp;")}},{key:"setupForm",value:function(){function setupForm(_x3){return _ref2.apply(this,arguments)}var _ref2=_asyncToGenerator(regeneratorRuntime.mark(function _callee2(orderForm){var result,optionsHtml,formData,data,_this2=this;return regeneratorRuntime.wrap(function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return _context2.next=2,$.ajax({url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/products/"+PRODUCT});case 2:return result=_context2.sent,$("#description").html(result.data.description),optionsHtml=result.data.variants.reverse().map(function(v,idx){return'<tr class="product-row"><td class="product-selector product"><input type="radio" value="'+v.id+'" name="variant" '+(0===idx?"checked":"")+'></td><td class="product-info product text-center text-md-left "><span class="font-weight-bold">Trident Underwater Drone</span> +&nbsp;'+_this2.getOptions(v.options.values)+'<div class="hidden-sm-up price-sm pt-3">$'+(v.price/100).toFixed(2)+'</div></td><td class="text-right product pricing hidden-sm-down">$'+(v.price/100).toFixed(2)+"</td></tr>"}).join(""),orderForm.find("#options").prepend(optionsHtml),formData=objectifyForm(orderForm.serializeArray()),formData.country="us",data=this.getData(formData),this._calculateShipping(data,orderForm),orderForm.find('#country option[value="US"]').attr("selected","true"),orderForm.find("#country").change(function(ev){"US"===ev.currentTarget.options[ev.target.selectedIndex].value?(orderForm.find("#usState").parent().removeClass("hidden-xs-up").attr("required",!1),orderForm.find("#state").attr("required",!1).parent().addClass("hidden-xs-up")):(orderForm.find("#state").attr("required",!0).parent().removeClass("hidden-xs-up"),orderForm.find("#usState").parent().addClass("hidden-xs-up").attr("required",!1)),orderForm.validator("update"),_this2.calculateShipping(orderForm)}),orderForm.find("#zip").change(function(ev){_this2.calculateShipping(orderForm)}),orderForm.find("#usState").change(function(ev){_this2.calculateShipping(orderForm)}),orderForm.find("#quantity").change(function(ev){$("#quantityOrdered").text(ev.target.value);var itemsOrdered=parseInt(ev.target.value),valueLabel=1===itemsOrdered?"item":"items";$("#itemsLabel").text(valueLabel),_this2.calculateShipping(orderForm)}),orderForm.find("#ccNumber").keypress(function(event){String.fromCharCode(event.which).match(/[0-9- ]/)||event.preventDefault()}),orderForm.find("#expDate").keypress(function(event){String.fromCharCode(event.which).match(/[0-9\/]/)||event.preventDefault()}),orderForm.find("tr.product-row").click(function(ev){orderForm.find('input[type=radio][name="variant"][checked]')[0].removeAttribute("checked"),$(ev.target).parent().find('input[type=radio][name="variant"]')[0].setAttribute("checked","checked"),_this2.calculateShipping(orderForm)}),orderForm.on("valid.bs.validator",function(ev){ev.relatedTarget.checkValidity()&&$(ev.relatedTarget).parent().removeClass("has-danger").removeClass("has-error")}).on("invalid.bs.validator",function(ev){console.log(ev.relatedTarget.id+" "+ev.detail),ev.relatedTarget.checkValidity()||$(ev.relatedTarget).parent().addClass("has-danger").addClass("has-error")}),_context2.abrupt("return",result.data.variants);case 20:case"end":return _context2.stop()}},_callee2,this)}));return setupForm}()},{key:"submit",value:function(){function submit(){return _ref3.apply(this,arguments)}var _ref3=_asyncToGenerator(regeneratorRuntime.mark(function _callee3(){var orderForm,variants,formData,data,result,order,total,currency,line_items,path;return regeneratorRuntime.wrap(function(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:return orderForm=this.orderForm,variants=this.variants,orderForm.find("#order").attr("disabled",!0),orderForm.find("#orderProcessing").show(),formData=objectifyForm(orderForm.serializeArray()),data=this.getData(formData),_context3.prev=5,_context3.next=8,$.ajax({async:!0,crossDomain:!0,url:"https://api.trycelery.com/v2/orders/checkout",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(data)});case 8:result=_context3.sent,order=result.data,total=order.total/100,currency=order.currency,line_items=order.line_items.map(function(item){return item.celery_sku}).join(","),path="?number="+order.number+"&amount="+total+"&currency="+currency+"&line_items="+line_items,window.location.replace(window.location.href+"../confirmation/"+path),_context3.next=24;break;case 17:_context3.prev=17,_context3.t0=_context3.catch(5),orderForm.find(".alert .title").text(_context3.t0.statusText),orderForm.find(".alert .description").text(_context3.t0.responseJSON.data),orderForm.find(".alert").show(),orderForm.find("#orderProcessing").hide(),orderForm.find("#order").attr("disabled",!1);case 24:case"end":return _context3.stop()}},_callee3,this,[[5,17]])}));return submit}()},{key:"runSetupForm",value:function(){function runSetupForm(){return _ref4.apply(this,arguments)}var _ref4=_asyncToGenerator(regeneratorRuntime.mark(function _callee4(){return regeneratorRuntime.wrap(function(_context4){for(;;)switch(_context4.prev=_context4.next){case 0:return _context4.next=2,this.setupForm(this.orderForm);case 2:this.variants=_context4.sent,this.orderForm.validator("update");case 4:case"end":return _context4.stop()}},_callee4,this)}));return runSetupForm}()},{key:"init",value:function(){var _this3=this;this.orderForm=$("form#orderForm");var self=this;this.orderForm.validator().find("button.submit").click(function(ev){ev.preventDefault(),void 0!==self.variants&&(_this3.orderForm.validator("validate"),self.orderForm[0].checkValidity()&&_this3.submit())}),this.orderForm.find("#applyDiscount").click(function(ev){_this3.calculateShipping(_this3.orderForm)}),$("#orderFormContainer").removeClass("invisible"),$("#loader-wrapper").addClass("loaded"),this.runSetupForm()}}]),BuyScreen}();!function(){(new BuyScreen).init()}();