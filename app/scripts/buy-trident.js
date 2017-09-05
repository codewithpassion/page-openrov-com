//const PRODUCT = '57e9bd02726ecc1100f4204a'; // testproduct
const PRODUCT = '5637ca44df92ea03009633b3'; //trident

function objectifyForm(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

class BuyScreen {

    isEmail(email) {
        // See http://rosskendall.com/blog/web/javascript-function-to-check-an-email-address-conforms-to-rfc822

        return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email);
    }


    getData(formData) {
        var address = {
            "first_name": formData.firstName,
            "last_name": formData.lastName,
            "company": null,
            "line1": formData.address1,
            "line2": formData.address2,
            "city": formData.city,
            "state": formData.country === 'US' ? formData.usState.toLowerCase() : formData.state,
            "zip": formData.zip,
            "country": formData.country.toLowerCase(),
            "phone": formData.phone
        };

        var data = {
            "user_id": '5637c8d966e9ec03008989ef',
            "buyer": {
                "email": formData.email,
                "first_name": formData.firstName,
                "last_name": formData.lastName,
                "phone": formData.phone,
                "notes": formData.notes + " #### How will you use Trident: " + formData.useForTrident
            },
            "shipping_address": address,
            "billing_address": Object.assign({}, address, { zip: formData.billingZip }),
            "line_items": [{
                "product_id": PRODUCT,
                "variant_id": formData.variant,
                "quantity": parseInt(formData.quantity)
            }],
            "payment_source": {},
            "discount_codes": [formData.couponCode]
        };
        return data;
    }

    getPaymentData(formData) {
        return {
            "card": {
                "name": formData.firstName + ' ' + formData.lastName,
                "number": formData.ccNumber,
                "exp_month": formData.expDateMonth,
                "exp_year": formData.expDateYear,
                "cvc": formData.cvc
            }
        };
    }

    getVariant(formData, variants) {

        let selectedVariants = [];
        for (const item in formData) {
            if (item.startsWith('option_')) {
                selectedVariants.push(formData[item])
            }
        }
        selectedVariants = selectedVariants.sort();

        for(const v of variants) {
            const ids = v.options.ids.sort();
            if (ids.join() === selectedVariants.join()) {
                return v.id;
            }
        }
        return undefined;
    }

    calculateShipping(form) { 
        const formData = objectifyForm(form.serializeArray())
        formData.couponCode = form.find('#couponCode').val(); // disabled text fields don't show up in serializeArray
        const data = this.getData(formData);
        return this._calculateShipping(data, form);
    }

    async _calculateShipping(data, form) {    
        form.find('tfoot').addClass('calculating');
        const result = await $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/calculate-shipping",
            "method": "POST",
            "headers": { "content-type": "application/json" },
            "processData": false,
            "data": JSON.stringify(data),
        })
        form.find('#shipping').text('$' + (result.shipping /100).toFixed(2))
        if (result.discount > 0) {
            $('#discount-container').removeClass('d-none');
            $('#discount').text('$' + (result.discount / 100).toFixed(2))
        }
        else {
            $('#discount-container').addClass('d-none');
        }
        if (result.discounts && result.discounts.length > 0) {
            form.find('#couponCode').attr('disabled', true);
            form.find('#applyDiscount').addClass('btn-success').attr('disabled', true);
            if (result.discounts.filter(d => d.free_shipping == true).length > 0) {
                form.find('#freeShipping').removeClass('d-none');
                form.find('#shippingContainer').addClass('d-none');
            }
        }

        form.find('#tax').text('$' + (result.taxes / 100).toFixed(2))
        form.find('#total').text('$' + (result.total / 100).toFixed(2))
        form.find('tfoot').removeClass('calculating');
    }

    getOptionText(value) {
        var result = value.replace(/\([+$0-9].*\)/, '').trim();
        if (result == 'None') {
            return '';
        } else if (result.indexOf('Standard') > -1) {
            result = result;
        } else {
            result = result.replace(/Add A/, '');
        }
        return '<span class="text-nowrap">' + result + '</span>';
    };

    getOptions(values) {
        return values
            .map(val => this.getOptionText(val))
            .filter(val => val.trim().length != 0)
            .join(' +&nbsp;')
    }

    countryChanged(target) {
        if (target.options[target.selectedIndex].value === 'US') {
            this.orderForm.find('#usState').parent().removeClass('d-none').attr('required', false);
            this.orderForm.find('#state').parent().addClass('d-none');
        } else {
            this.orderForm.find('#state').parent().removeClass('d-none');
            this.orderForm.find('#usState').parent().addClass('d-none').attr('required', false);
        }
        this.orderForm.validator('update');
        this.calculateShipping(this.orderForm);
    }

    async setupForm(orderForm) {
        const result = await $.ajax({
            url: 'https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/products/' + PRODUCT
        });

        $('#description').html(result.data.description);

        const optionsHtml = result.data.variants.reverse().map((v, idx) => {
            const price = (v.price / 100);
            return '<tr class="product-row" data-product-option="' + v.options.values.join(' + ') +'">' + 
                    '<td class="product-selector product">' + 
                    ('<input type="radio" value="' + v.id + '" name="variant" ' + (idx === 0 ? 'checked' : '') + '>') + '</td>' + 
                    '<td class="product-info product text-center text-md-left ">' +  
                        '<span class="font-weight-bold">Trident Underwater Drone</span> <br class="d-sm-none">+&nbsp;' + 
                        this.getOptions(v.options.values) + 
                '<div class="d-sm-none price-sm pt-3"><em><small><s class="pr-2">$' + (price + 300).toFixed(2) + '</s></small></em>&nbsp;$' + price.toFixed(2)  +'</div>' +
                    '</td>' + 
                '<td class="text-right product pricing d-none d-md-block"><em><small><s  class="pr-2">$' + (price + 200).toFixed(2) + '</s></small></em>$' + price.toFixed(2) + '</td>' + '</tr>';
        }).join('');

        orderForm.find('#options').prepend(optionsHtml);
        orderForm.find('#savingsContainer').removeClass('d-none');

        const formData = objectifyForm(orderForm.serializeArray())
        formData.country = 'us';

        const data = this.getData(formData);
        this._calculateShipping(data, orderForm);

        const country = orderForm.find('#country');
        if (!country.attr('data-store-loaded')) {
            country.val('US');
        }
        this.countryChanged(country.get(0));

        country.change(ev => {
            this.countryChanged(ev.target);
        })

        orderForm.find('#zip').change(ev => {
            this.calculateShipping(orderForm);
        });
        orderForm.find('#usState').change(ev => {
            this.calculateShipping(orderForm);
        });

        orderForm.find('#quantity').change(ev => {
            $('#quantityOrdered').text(ev.target.value);
            var itemsOrdered = parseInt(ev.target.value);
            var valueLabel = itemsOrdered === 1 ? 'item' : 'items';
            $('#itemsLabel').text(valueLabel);
            this.calculateShipping(orderForm);

            orderForm.find('#savings').text((300 * itemsOrdered).toFixed(2));
        });


        orderForm.find('#ccNumber').keypress(event => {
            var char = String.fromCharCode(event.which);
            if (!char.match(/[0-9- ]/)) event.preventDefault();
        });

        orderForm.find('tr.product-row').click(ev => {
            const checked = orderForm.find('input[type=radio][name="variant"][checked]')[0];
            if (checked) { checked.removeAttribute('checked'); }
            const newItem = $(ev.target).parent().find('input[type=radio][name="variant"]')[0];
            if (newItem) { newItem.setAttribute('checked', 'checked'); }
            this.calculateShipping(orderForm);

            const value = orderForm.find('input[type=radio][name="variant"][checked]').val();
            localStorage.setItem('buyNow.productVariant',value);
        });

        orderForm.on('valid.bs.validator', ev => {
            if (ev.relatedTarget.checkValidity()) {
                $(ev.relatedTarget).parent().removeClass('has-danger').removeClass('has-error');
            }
        }).on('invalid.bs.validator', ev => {
            console.log(ev.relatedTarget.id + ' ' + ev.detail);
            if (!ev.relatedTarget.checkValidity()) {
                $(ev.relatedTarget).parent().addClass('has-danger').addClass('has-error');
            }
        });

        const variant = localStorage.getItem('buyNow.productVariant');
        if (variant) {
            const checked = orderForm.find('input[type=radio][name="variant"][checked]')[0];
            if (checked) { checked.removeAttribute('checked'); }
            const newItem = orderForm.find(`input[type=radio][name="variant"][value=${variant}]`)[0];
            if (newItem) { newItem.setAttribute('checked', 'checked'); }
            this.calculateShipping(orderForm);
        }

        return result.data.variants;
    };


    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    async submit() {

        $(window).off('beforeunload');

        const { orderForm, billingForm, variants } = this;
        billingForm.find('#order').attr('disabled', true).addClass('btn-secondary');
        billingForm.find('#orderProcessing').show();

        const formData = objectifyForm(orderForm.serializeArray());
        formData.couponCode = orderForm.find('#couponCode').val(); // disabled text fields don't show up in serializeArray
        const data = this.getData(formData);
        const paymentData = objectifyForm(billingForm.serializeArray());
        paymentData.firstName = formData.firstName;
        paymentData.lastName = formData.lastName;
        data.payment_source = this.getPaymentData(paymentData);
        try {
            const result = await $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "https://api.trycelery.com/v2/orders/checkout",
                "method": "POST",
                "headers": { "content-type": "application/json" },
                "processData": false,
                "data": JSON.stringify(data),
            })

            var order = result.data;
            var total = order.total / 100;
            var currency = order.currency;
            var line_items = order.line_items.map(function (item) { return item.celery_sku; }).join(',');
            let path = "?number=" + order.number +
                         "&amount=" + total + 
                         "&currency=" + currency + 
                         "&line_items=" + line_items;

            const utmSource = this.getQueryStringValue('utm_source');
            const utmMedium = this.getQueryStringValue('utm_medium');
            if (utmSource) {
                path += `&utm_source=${encodeURIComponent(utmSource)}`
            }
            if (utmMedium) {
                path += `&utm_medium=${encodeURIComponent(utmMedium)}`
            }
            
            this.clearStorage();
            document.__isSubmitted = true;
            

            this.setCookie('order', JSON.stringify({
                number: order.number,
                total: order.total,
                taxes: order.taxes,
                shipping: order.shipping,
                line_items: order.line_items.map(item => ({ 
                    celery_sku: item.celery_sku,
                    variant_name: item.variant_name,
                    price: item.price,
                    quantity: item.quantity
                }))
            }), 2);

            window.location.replace(
                window.location.href.replace(window.location.search, "")
                + '../confirmation/' + path);
        }
        catch (err) {
            billingForm.find('.alert .title').text(err.statusText);
            billingForm.find('.alert .description').text(err.responseJSON.data);
            billingForm.find('.alert').show();
            billingForm.find('#orderProcessing').hide();
            billingForm.find('#order').attr('disabled', false).removeClass('btn-secondary');
        }

    }

    getQueryStringValue(key) {
        return decodeURIComponent(
            window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }  

    async runSetupForm() {
        this.variants = await this.setupForm(this.orderForm);
        this.orderForm.validator('update');
    }

    clearStorage() {
        if (!localStorage) return;

        for (let i = 0; i <= localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) { localStorage.removeItem(key); }
        }
    }

    setupStorage() {
        if (!localStorage) return;

        $('[data-store]')
            .on('change', (ev) => {
                const target = ev.currentTarget;
                if (target.tagName === 'INPUT') {
                    localStorage.setItem('buyNow.' + target.id, $(target).val())
                }
                if (target.tagName === 'SELECT') {
                    localStorage.setItem('buyNow.' + target.id, $(target).val())
                }
            })
            .each((i,e) => {
                if (e.tagName === 'INPUT') {
                    $(e).val(localStorage.getItem('buyNow.' + e.id));
                }
                if (e.tagName === 'SELECT') {
                    const value = localStorage.getItem('buyNow.' + e.id);
                    if (value) {
                        $(e)
                            .val(value)
                            .attr('data-store-loaded', 'true');

                    }
                }

                if (e.id === "couponCode") {
                    this.calculateShipping(this.orderForm);
                }
            })

    }

    async sendAbandondedEmail() {
        const email = this.orderForm.find('#email');
        if (this.isEmail(email.val())) {

            const data = {
                email_address: email.val(),
                "status": "subscribed",
                "merge_fields": {
                    "FNAME": this.orderForm.find('#firstName').val(),
                    "LNAME": this.orderForm.find('#lastName').val()
                }
            };

            try {
                const result = await $.ajax({
                    "async": true,
                    "crossDomain": true,
                    "url": "https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/mailchimp/abbandoned-card",
                    "method": "POST",
                    "headers": { "content-type": "application/json" },
                    "processData": false,
                    "data": JSON.stringify(data),
                })
            }
            catch (err) {
                console.error('Could not add email address');
            }
        }

    }

    setupAbandonedCart() {
        const email = this.orderForm.find('#email');
        $(window).on('beforeunload', ev => {
            if (!document.__isSubmitted) {
                this.sendAbandondedEmail();
            }

            var confirmationMessage = undefined;
            ev.returnValue = confirmationMessage; 
            return confirmationMessage;
         });
    }

    init() {
        this.orderForm = $('form#orderForm');
        this.billingForm = $('form#billingForm');
        const self = this;
        this.billingForm.validator().find('#order').click((ev) => {
            ev.preventDefault();

            if (self.variants === undefined) { return; }

            this.billingForm.validator('validate');

            if (!self.billingForm[0].checkValidity()) {
                self.billingForm.find('.alert .title').text('Billing information.');
                self.billingForm.find('.alert .description').text('Please check your billing information.');
                self.billingForm.find('.alert').show();

                return;
            }
            else {
                this.submit();
            }
        });

        this.orderForm.find('#applyDiscount').click(ev => {
            this.calculateShipping(this.orderForm);
        });

        this.orderForm.find('#enterBilling').click(ev => {
            ev.preventDefault();
            this.orderForm.validator('validate');
            if (!this.orderForm[0].checkValidity()) {
                return;
            }

            this.orderForm.find('#shippingInformation').fadeOut(() => {
                this.billingForm.find('#billingInformation').fadeIn();
            });
            this.setupAbandonedCart();

        });

        this.billingForm.find('#goBack').click(() => {
            this.billingForm.find('#billingInformation').fadeOut(() => {
                this.orderForm.find('#shippingInformation').fadeIn();
            });
            
        })

        $('#orderFormContainer').removeClass('invisible');
        $('#loader-wrapper').addClass('loaded');

        this.setupStorage();
        this.runSetupForm();        
 
    }
}


(function () {
    const screen = new BuyScreen();
    screen.init();
})()
