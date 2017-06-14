"use strict";function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(a,i){try{var o=t[a](i),s=o.value}catch(e){return void r(e)}if(!o.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}return n("next")})}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function objectifyForm(e){for(var t={},r=0;r<e.length;r++)t[e[r].name]=e[r].value;return t}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),PRODUCT="5637ca44df92ea03009633b3",BuyScreen=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"getData",value:function(e){var t={first_name:e.firstName,last_name:e.lastName,company:null,line1:e.address1,line2:e.address2,city:e.city,state:"US"===e.country?e.usState.toLowerCase():e.state,zip:e.zip,country:e.country.toLowerCase(),phone:e.phone};return{user_id:"5637c8d966e9ec03008989ef",buyer:{email:e.email,first_name:e.firstName,last_name:e.lastName,phone:e.phone,notes:e.notes},shipping_address:t,billing_address:Object.assign({},t,{zip:e.billingZip}),line_items:[{product_id:PRODUCT,variant_id:e.variant,quantity:parseInt(e.quantity)}],payment_source:{card:{name:e.firstName+" "+e.lastName,number:e.ccNumber,exp_month:e.expDate.split("/")[0],exp_year:e.expDate.split("/")[1],cvc:e.cvc}},discount_codes:[e.couponCode]}}},{key:"getVariant",value:function(e,t){var r=[];for(var n in e)n.startsWith("option_")&&r.push(e[n]);r=r.sort();var a=!0,i=!1,o=void 0;try{for(var s,c=t[Symbol.iterator]();!(a=(s=c.next()).done);a=!0){var u=s.value;if(u.options.ids.sort().join()===r.join())return u.id}}catch(e){i=!0,o=e}finally{try{!a&&c.return&&c.return()}finally{if(i)throw o}}}},{key:"calculateShipping",value:function(e){var t=objectifyForm(e.serializeArray());t.couponCode=e.find("#couponCode").val();var r=this.getData(t);return this._calculateShipping(r,e)}},{key:"_calculateShipping",value:function(){function e(e,r){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t,r){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r.find("tfoot").addClass("calculating"),e.next=3,$.ajax({async:!0,crossDomain:!0,url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/calculate-shipping",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(t)});case 3:n=e.sent,r.find("#shipping").text("$"+(n.shipping/100).toFixed(2)),n.discount>0?($("#discount-container").removeClass("hidden-xs-up"),$("#discount").text("$"+(n.discount/100).toFixed(2))):$("#discount-container").addClass("hidden-xs-up"),n.discounts&&n.discounts.length>0&&(r.find("#couponCode").attr("disabled",!0),r.find("#applyDiscount").addClass("btn-success").attr("disabled",!0),n.discounts.filter(function(e){return 1==e.free_shipping}).length>0&&(r.find("#freeShipping").removeClass("d-none"),r.find("#shippingContainer").addClass("d-none"))),r.find("#tax").text("$"+(n.taxes/100).toFixed(2)),r.find("#total").text("$"+(n.total/100).toFixed(2)),r.find("tfoot").removeClass("calculating");case 10:case"end":return e.stop()}},e,this)}));return e}()},{key:"getOptionText",value:function(e){var t=e.replace(/\([+$0-9].*\)/,"").trim();return"None"==t?"":'<span class="text-nowrap">'+(t=t.indexOf("Standard")>-1?t:t.replace(/Add A/,""))+"</span>"}},{key:"getOptions",value:function(e){var t=this;return e.map(function(e){return t.getOptionText(e)}).filter(function(e){return 0!=e.trim().length}).join(" +&nbsp;")}},{key:"setupForm",value:function(){function e(e){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var r,n,a,i,o=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$.ajax({url:"https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/products/"+PRODUCT});case 2:return r=e.sent,$("#description").html(r.data.description),n=r.data.variants.reverse().map(function(e,t){return'<tr class="product-row"><td class="product-selector product"><input type="radio" value="'+e.id+'" name="variant" '+(0===t?"checked":"")+'></td><td class="product-info product text-center text-md-left "><span class="font-weight-bold">Trident Underwater Drone</span> +&nbsp;'+o.getOptions(e.options.values)+'<div class="hidden-sm-up price-sm pt-3">$'+(e.price/100).toFixed(2)+'</div></td><td class="text-right product pricing hidden-sm-down">$'+(e.price/100).toFixed(2)+"</td></tr>"}).join(""),t.find("#options").prepend(n),a=objectifyForm(t.serializeArray()),a.country="us",i=this.getData(a),this._calculateShipping(i,t),t.find('#country option[value="US"]').attr("selected","true"),t.find("#country").change(function(e){"US"===e.currentTarget.options[e.target.selectedIndex].value?(t.find("#usState").parent().removeClass("hidden-xs-up").attr("required",!1),t.find("#state").attr("required",!1).parent().addClass("hidden-xs-up")):(t.find("#state").attr("required",!0).parent().removeClass("hidden-xs-up"),t.find("#usState").parent().addClass("hidden-xs-up").attr("required",!1)),t.validator("update"),o.calculateShipping(t)}),t.find("#zip").change(function(e){o.calculateShipping(t)}),t.find("#usState").change(function(e){o.calculateShipping(t)}),t.find("#quantity").change(function(e){$("#quantityOrdered").text(e.target.value);var r=parseInt(e.target.value),n=1===r?"item":"items";$("#itemsLabel").text(n),o.calculateShipping(t)}),t.find("#ccNumber").keypress(function(e){String.fromCharCode(e.which).match(/[0-9- ]/)||e.preventDefault()}),t.find("#expDate").keypress(function(e){String.fromCharCode(e.which).match(/[0-9\/]/)||e.preventDefault()}),t.find("tr.product-row").click(function(e){t.find('input[type=radio][name="variant"][checked]')[0].removeAttribute("checked"),$(e.target).parent().find('input[type=radio][name="variant"]')[0].setAttribute("checked","checked"),o.calculateShipping(t)}),t.on("valid.bs.validator",function(e){e.relatedTarget.checkValidity()&&$(e.relatedTarget).parent().removeClass("has-danger").removeClass("has-error")}).on("invalid.bs.validator",function(e){console.log(e.relatedTarget.id+" "+e.detail),e.relatedTarget.checkValidity()||$(e.relatedTarget).parent().addClass("has-danger").addClass("has-error")}),e.abrupt("return",r.data.variants);case 20:case"end":return e.stop()}},e,this)}));return e}()},{key:"submit",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r,n,a,i,o,s,c,u,d;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.orderForm,r=this.variants,t.find("#order").attr("disabled",!0),t.find("#orderProcessing").show(),n=objectifyForm(t.serializeArray()),a=this.getData(n),e.prev=5,e.next=8,$.ajax({async:!0,crossDomain:!0,url:"https://api.trycelery.com/v2/orders/checkout",method:"POST",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(a)});case 8:i=e.sent,o=i.data,s=o.total/100,c=o.currency,u=o.line_items.map(function(e){return e.celery_sku}).join(","),d="?number="+o.number+"&amount="+s+"&currency="+c+"&line_items="+u,window.location.replace(window.location.href+"../confirmation/"+d),e.next=24;break;case 17:e.prev=17,e.t0=e.catch(5),t.find(".alert .title").text(e.t0.statusText),t.find(".alert .description").text(e.t0.responseJSON.data),t.find(".alert").show(),t.find("#orderProcessing").hide(),t.find("#order").attr("disabled",!1);case 24:case"end":return e.stop()}},e,this,[[5,17]])}));return e}()},{key:"runSetupForm",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setupForm(this.orderForm);case 2:this.variants=e.sent,this.orderForm.validator("update");case 4:case"end":return e.stop()}},e,this)}));return e}()},{key:"init",value:function(){var e=this;this.orderForm=$("form#orderForm");var t=this;this.orderForm.validator().find("button.submit").click(function(r){r.preventDefault(),void 0!==t.variants&&(e.orderForm.validator("validate"),t.orderForm[0].checkValidity()&&e.submit())}),this.orderForm.find("#applyDiscount").click(function(t){e.calculateShipping(e.orderForm)}),$("#orderFormContainer").removeClass("invisible"),$("#loader-wrapper").addClass("loaded"),this.runSetupForm()}}]),e}();!function(){(new BuyScreen).init()}();