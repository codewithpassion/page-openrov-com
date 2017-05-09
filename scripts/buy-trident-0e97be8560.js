"use strict";function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}if(!info.done)return Promise.resolve(value).then(function(value){step("next",value)},function(err){step("throw",err)});resolve(value)}return step("next")})}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function objectifyForm(formArray){for(var returnArray={},i=0;i<formArray.length;i++)returnArray[formArray[i].name]=formArray[i].value;return returnArray}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),PRODUCT="57e9bd02726ecc1100f4204a",BuyScreen=function(){function BuyScreen(){_classCallCheck(this,BuyScreen)}return _createClass(BuyScreen,[{key:"getData",value:function(formData,variant){var address={first_name:formData.firstName,last_name:formData.lastName,company:null,line1:formData.address1,line2:formData.address2,city:formData.city,state:"US"===formData.country?formData.usState:formData.state,zip:formData.zip,country:formData.country.toLowerCase(),phone:formData.phone};return{user_id:"5637c8d966e9ec03008989ef",buyer:{email:formData.email,first_name:formData.firstName,last_name:formData.lastName,phone:formData.phone,notes:formData.notes},shipping_address:address,billing_address:Object.assign({},address,{zip:formData.billingZip}),line_items:[{product_id:PRODUCT,variant_id:variant,quantity:parseInt(formData.quantity)}],payment_source:{card:{name:formData.firstName+" "+formData.lastName,number:formData.ccNumber,exp_month:formData.expDate.split("/")[0],exp_year:formData.expDate.split("/")[1],cvc:formData.cvc}},discount_codes:[]}}},{key:"getVariant",value:function(formData,variants){var selectedVariants=[];for(var item in formData)item.startsWith("option_")&&selectedVariants.push(formData[item]);selectedVariants=selectedVariants.sort();var _iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,_iterator=variants[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){var v=_step.value;if(v.options.ids.sort().join()===selectedVariants.join())return v.id}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{!_iteratorNormalCompletion&&_iterator.return&&_iterator.return()}finally{if(_didIteratorError)throw _iteratorError}}}},{key:"calculateShipping",value:function(form,variants){var formData=objectifyForm(form.serializeArray()),data=this.getData(formData,this.getVariant(form,variants));return this._calculateShipping(data,form)}},{key:"_calculateShipping",value:function(){function _calculateShipping(_x,_x2){return _ref.apply(this,arguments)}var _ref=_asyncToGenerator(regeneratorRuntime.mark(function _callee(data,form){var result;return regeneratorRuntime.wrap(function(_context){for(;;)switch(_context.prev=_context.next){case 0:return form.find(".loading").show(),_context.next=3,$.ajax({async:!0,crossDomain:!0,url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/calculate-shipping",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(data)});case 3:result=_context.sent,form.find("#shipping").val("$"+(result.shipping/100).toFixed(2)),form.find("#subtotal").val("$"+(result.subtotal/100).toFixed(2)),form.find("#tax").val("$"+(result.taxes/100).toFixed(2)),form.find("#total").val("$"+(result.total/100).toFixed(2)),form.find(".loading").hide();case 9:case"end":return _context.stop()}},_callee,this)}));return _calculateShipping}()},{key:"setupForm",value:function(){function setupForm(_x3){return _ref2.apply(this,arguments)}var _ref2=_asyncToGenerator(regeneratorRuntime.mark(function _callee2(orderForm){var result,optionsHtml,formData,data,variants,_this=this;return regeneratorRuntime.wrap(function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return _context2.next=2,$.ajax({url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/products/"+PRODUCT});case 2:return result=_context2.sent,$("#description").html(result.data.description),optionsHtml=result.data.options.map(function(o){return'<div class="form-group row"><label for="'+o.id+'" class="col-2 col-form-label">'+o.name+':</label><select class="form-control form-control-danger col-6" id="option_'+o.id+'" name="option_'+o.id+'" required><option selected value="" disabled>Select '+o.name+"</option>"+o.values.map(function(v){return'<option value="'+v.id+'">'+v.name+"</option>"}).join("")+"</select></div>"}).join(""),formData=objectifyForm(orderForm.serializeArray()),formData.country="us",data=this.getData(formData,result.data.variants[result.data.variants.length-1].id),this._calculateShipping(data,orderForm),orderForm.find("#options").append(optionsHtml),orderForm.find('#country option[value="US"]').attr("selected","true"),orderForm.find("#country").change(function(ev){"US"===ev.currentTarget.options[ev.target.selectedIndex].value?(orderForm.find("#usState").removeClass("hidden-xs-up").attr("required",!1),orderForm.find("#state").addClass("hidden-xs-up").attr("required",!0)):(orderForm.find("#state").removeClass("hidden-xs-up").attr("required",!1),orderForm.find("#usState").addClass("hidden-xs-up").attr("required",!1)),orderForm.validator("update"),_this.calculateShipping(orderForm,result.data.variants)}),orderForm.find("#options select").change(function(ev){_this.calculateShipping(orderForm,result.data.variants)}),orderForm.find("#quantity").change(function(ev){_this.calculateShipping(orderForm,result.data.variants)}),orderForm.find("#ccNumber").keypress(function(event){String.fromCharCode(event.which).match(/[0-9- ]/)||event.preventDefault()}),orderForm.find("#expDate").keypress(function(event){String.fromCharCode(event.which).match(/[0-9\/]/)||event.preventDefault()}),orderForm.on("validated.bs.validator",function(ev){if("expDate"===ev.relatedTarget.id){if(!ev.relatedTarget.checkValidity())return $(ev.relatedTarget).parent().addClass("has-danger"),!1;$(ev.relatedTarget).parent().removeClass("has-danger")}}).on("invalid.bs.validator",function(ev){console.log(ev.relatedTarget.id+" "+ev.detail)}),variants=result.data.variants,_context2.abrupt("return",variants);case 19:case"end":return _context2.stop()}},_callee2,this)}));return setupForm}()},{key:"submit",value:function(){function submit(){return _ref3.apply(this,arguments)}var _ref3=_asyncToGenerator(regeneratorRuntime.mark(function _callee3(){var orderForm,variants,formData,data,result,order,total,currency,line_items,path;return regeneratorRuntime.wrap(function(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:return orderForm=this.orderForm,variants=this.variants,orderForm.find('button[type="submit"]').attr("disabled",!0),orderForm.find(".submitting").show(),formData=objectifyForm(orderForm.serializeArray()),data=this.getData(formData,this.getVariant(formData,this.getVariant(form,variants))),_context3.prev=5,_context3.next=8,$.ajax({async:!0,crossDomain:!0,url:"https://api.trycelery.com/v2/orders/checkout",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(data)});case 8:result=_context3.sent,order=result.data,total=order.total/100,currency=order.currency,line_items=order.line_items.map(function(item){return item.celery_sku}).join(","),path="?number="+order.number+"&amount="+total+"&currency="+currency+"&line_items="+line_items,window.location.replace(window.location.href+"../confirmation/"+path),_context3.next=23;break;case 17:_context3.prev=17,_context3.t0=_context3.catch(5),this.orderForm.find(".alert .title").text(_context3.t0.statusText),this.orderForm.find(".alert .description").text(_context3.t0.responseJSON.data),this.orderForm.find(".alert").show(),this.orderForm.find(".submitting").hide();case 23:case"end":return _context3.stop()}},_callee3,this,[[5,17]])}));return submit}()},{key:"runSetupForm",value:function(){function runSetupForm(){return _ref4.apply(this,arguments)}var _ref4=_asyncToGenerator(regeneratorRuntime.mark(function _callee4(){return regeneratorRuntime.wrap(function(_context4){for(;;)switch(_context4.prev=_context4.next){case 0:return _context4.next=2,this.setupForm(this.orderForm);case 2:this.variants=_context4.sent,this.orderForm.validator("update");case 4:case"end":return _context4.stop()}},_callee4,this)}));return runSetupForm}()},{key:"init",value:function(){var _this2=this;this.orderForm=$("form#orderForm");var self=this;this.orderForm.validator().find("button.submit").click(function(ev){ev.preventDefault(),void 0!==self.variants&&(_this2.orderForm.validator("validate"),self.orderForm[0].checkValidity()&&_this2.submit())}),$("#orderFormContainer").removeClass("invisible"),$("#loader-wrapper").addClass("loaded"),this.runSetupForm()}}]),BuyScreen}();!function(){(new BuyScreen).init()}();