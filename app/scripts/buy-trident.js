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
                "notes": formData.notes
            },
            "shipping_address": address,
            "billing_address": Object.assign({}, address, { zip: formData.billingZip }),
            "line_items": [{
                "product_id": PRODUCT,
                "variant_id": formData.variant,
                "quantity": parseInt(formData.quantity)
            }],
            "payment_source": {
                "card": {
                    "name": formData.firstName + ' ' + formData.lastName,
                    "number": formData.ccNumber,
                    "exp_month": formData.expDate.split('/')[0],
                    "exp_year": formData.expDate.split('/')[1],
                    "cvc": formData.cvc
                }
            },
            "discount_codes": [formData.couponCode]
        };
        return data;
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
            $('#discount-container').removeClass('hidden-xs-up');
            $('#discount').text('$' + (result.discount / 100).toFixed(2))
        }
        else {
            $('#discount-container').addClass('hidden-xs-up');
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

    async setupForm(orderForm) {
        const result = await $.ajax({
            url: 'https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/products/' + PRODUCT
        });

        $('#description').html(result.data.description);

        const optionsHtml = result.data.variants.reverse().map((v, idx) => {
            const price = (v.price / 100);
            return '<tr class="product-row" data-product-option="' + this.getOptions(v.options.values) +'">' + 
                    '<td class="product-selector product">' + 
                    ('<input type="radio" value="' + v.id + '" name="variant" ' + (idx === 0 ? 'checked' : '') + '>') + '</td>' + 
                    '<td class="product-info product text-center text-md-left ">' +  
                        '<span class="font-weight-bold">Trident Underwater Drone</span> <br class="hidden-sm-up">+&nbsp;' + 
                        this.getOptions(v.options.values) + 
                '<div class="hidden-sm-up price-sm pt-3"><em><small><s class="pr-2">$' + (price + 300).toFixed(2) + '</s></small></em>&nbsp;$' + price.toFixed(2)  +'</div>' +
                    '</td>' + 
                '<td class="text-right product pricing hidden-sm-down"><em><small><s  class="pr-2">$' + (price + 300).toFixed(2) + '</s></small></em>$' + price.toFixed(2) + '</td>' + '</tr>';
        }).join('');

        orderForm.find('#options').prepend(optionsHtml);
        orderForm.find('#savingsContainer').removeClass('d-none');

        const formData = objectifyForm(orderForm.serializeArray())
        formData.country = 'us';

        const data = this.getData(formData);
        this._calculateShipping(data, orderForm);

        orderForm.find('#country option[value="US"]').attr('selected', 'true');
        orderForm.find('#country').change(ev => {
            if (ev.currentTarget.options[ev.target.selectedIndex].value === 'US') {
                orderForm.find('#usState').parent().removeClass('hidden-xs-up').attr('required', false);
                orderForm.find('#state').attr('required', false).parent().addClass('hidden-xs-up');
            } else {
                orderForm.find('#state').attr('required', true).parent().removeClass('hidden-xs-up');
                orderForm.find('#usState').parent().addClass('hidden-xs-up').attr('required', false);
            }
            orderForm.validator('update');
            this.calculateShipping(orderForm);
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

        orderForm.find('#expDate').keypress(event => {
            var char = String.fromCharCode(event.which);
            if (!char.match(/[0-9/]/)) event.preventDefault();
        });
        
        orderForm.find('tr.product-row').click(ev => {
            const checked = orderForm.find('input[type=radio][name="variant"][checked]')[0];
            if (checked) { checked.removeAttribute('checked'); }
            const newItem = $(ev.target).parent().find('input[type=radio][name="variant"]')[0];
            if (newItem) { newItem.setAttribute('checked', 'checked'); }
            this.calculateShipping(orderForm);
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

        return result.data.variants;
    };

    async submit() {
        const { orderForm, variants } = this;
        orderForm.find('#order').attr('disabled', true).addClass('btn-secondary');
        orderForm.find('#orderProcessing').show();

        const formData = objectifyForm(orderForm.serializeArray())
        const data = this.getData(formData);
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
            const path = "?number=" + order.number +
                         "&amount=" + total + 
                         "&currency=" + currency + 
                         "&line_items=" + line_items;

            window.location.replace(window.location.href + '../confirmation/' + path);
        }
        catch (err) {
            orderForm.find('.alert .title').text(err.statusText);
            orderForm.find('.alert .description').text(err.responseJSON.data);
            orderForm.find('.alert').show();
            orderForm.find('#orderProcessing').hide();
            orderForm.find('#order').attr('disabled', false).removeClass('btn-secondary');
        }

    }

    async runSetupForm() {
        this.variants = await this.setupForm(this.orderForm);
        this.orderForm.validator('update');
    }

    init() {
        this.orderForm = $('form#orderForm');
        const self = this;
        this.orderForm.validator().find('button.submit').click((ev) => {
            ev.preventDefault();

            if (self.variants === undefined) { return; }

            this.orderForm.validator('validate');

            if (!self.orderForm[0].checkValidity()) {
                return;
            }
            else {
                this.submit();
            }
        });

        this.orderForm.find('#applyDiscount').click(ev => {
            this.calculateShipping(this.orderForm);
        });

        $('#orderFormContainer').removeClass('invisible');
        $('#loader-wrapper').addClass('loaded');

        this.runSetupForm();        
    }
}


(function () {
    const screen = new BuyScreen();
    screen.init();
})()
