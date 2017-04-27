const PRODUCT = '57e9bd02726ecc1100f4204a'; // testproduct
// const PRODUCT = '5637ca44df92ea03009633b3'; //trident

function objectifyForm(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

class BuyScreen {

    getData(formData, variants) {
        const variant = this.getVariant(formData, variants);
        const address = {
            "first_name": formData.firstName,
            "last_name": formData.lastName,
            "company": null,
            "line1": formData.address1,
            "line2": formData.address2,
            "city": formData.city,
            "state": formData.country === 'US' ? formData.usState : formData.state,
            "zip": formData.zip,
            "country": formData.country.toLowerCase(),
            "phone": formData.phone,
        };

        const data = {
            "user_id": '5637c8d966e9ec03008989ef',
            "buyer": {
                "email": formData.email,
                "first_name": formData.firstName,
                "last_name": formData.lastName,
                "phone": formData.phone,
                "notes": formData.notes,
            },
            "shipping_address": address,
            "billing_address": Object.assign({} , address, { zip: formData.billingZip }),
            "line_items": [
                {
                    // "product_id": "5637ca44df92ea03009633b3",
                    "product_id": PRODUCT,
                    "variant_id": variant,
                    "quantity": parseInt(formData.quantity)
                }
            ],
            "payment_source": {
                "card": {
                    "name": `${formData.firstName} ${formData.lastName}`,
                    "number": formData.ccNumber,
                    "exp_month": formData.expDate.split('/')[0],
                    "exp_year": formData.expDate.split('/')[1],
                    "cvc": formData.cvc
                }
            },
            "discount_codes": []
        }
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

    async calculateShipping(form, variants) {    
        const formData = objectifyForm(form.serializeArray())

        const data = this.getData(formData, variants);
        form.find('.loading').show();
        const result = await $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/calculate-shipping",
            "method": "POST",
            "headers": { "content-type": "application/json" },
            "processData": false,
            "data": JSON.stringify(data),
        })
        form.find('#shipping').val('$' + (result.shipping /100).toFixed(2))
        form.find('#subtotal').val('$' + (result.subtotal / 100).toFixed(2))
        form.find('#tax').val('$' + (result.taxes / 100).toFixed(2))
        form.find('#total').val('$' + (result.total / 100).toFixed(2))
        form.find('.loading').hide();
    }

    async setupForm(orderForm) {
        const result = await $.ajax({
            url: 'https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/products/' + PRODUCT
        });
        $('#description').html(result.data.description);

        const optionsHtml = result.data.options.map(o => {
            return '<div class="form-group row">' +
                `<label for="${o.id}" class="col-2 col-form-label">${o.name}:</label>` +
                `<select class="form-control form-control-danger col-6" id="option_${o.id}" name="option_${o.id}" required>` +
                `<option selected value="" disabled>Select ${o.name}</option>` +
                    o.values.map(v => {
                        return `<option value="${v.id}">${v.name}</option>`
                    }).join('') +
                '</select>' +
                '</div>';        
        }).join('');

        orderForm.find('#options').append(optionsHtml);

        orderForm.find('#country option[value="US"]').attr('selected', 'true');
        orderForm.find('#country').change(ev => {
            if (ev.currentTarget.options[ev.target.selectedIndex].value === 'US') {
                orderForm.find('#usState').removeClass('hidden-xs-up');
                orderForm.find('#state').addClass('hidden-xs-up');
            }
            else {
                orderForm.find('#state').removeClass('hidden-xs-up');
                orderForm.find('#usState').addClass('hidden-xs-up');
            }

            this.calculateShipping(orderForm, result.data.variants);
        })

        orderForm.find('#options select').change(ev => {
            this.calculateShipping(orderForm, result.data.variants);
        });

        orderForm.find('#quantity').change(ev => {
            this.calculateShipping(orderForm, result.data.variants);
        });

        orderForm.find('#ccNumber').keypress((event) => {
            var char = String.fromCharCode(event.which)
            if (!char.match(/[0-9- ]/)) event.preventDefault();
        });

        orderForm
            .on('validated.bs.validator', ev => {
                if (ev.relatedTarget.id === 'expDate' ) {
                    if (!ev.relatedTarget.checkValidity()) {
                        $(ev.relatedTarget).parent().addClass('has-danger');
                        return false;
                    }
                    else {
                        $(ev.relatedTarget).parent().removeClass('has-danger');
                    }

                }
            })
            .on('invalid.bs.validator', ev => {
                console.log(ev.relatedTarget.id + ' ' + ev.detail);

                // if (ev.relatedTarget.id === 'expDate' && ev.type === 'invalid') {
                //     ev.relatedTarget.parent().addClass('has-danger')
                // }
            })

        const variants = result.data.variants;
        return variants;
    };

    async submit() {
        const { orderForm, variants } = this;
        orderForm.find('button[type="submit"]').attr('disabled', true);
        orderForm.find('.submitting').show();

        const formData = objectifyForm(orderForm.serializeArray())
        const data = this.getData(formData, variants);
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

            order = result.data;
            var total = order.total / 100;
            var currency = order.currency;
            var line_items = order.line_items.map(function (item) { return item.celery_sku; }).join(',');
            const path = "?number = " + order.number +
                         " & amount=" + total + 
                         " & currency=" + currency + 
                         " & line_items=" + line_items;

            window.location.replace(window.location.href + '../confirmation/' + path);
        }
        catch (err) {
            this.orderForm.find('.alert .title').text(err.statusText);
            this.orderForm.find('.alert .description').text(err.responseJSON.data);
            this.orderForm.find('.alert').show();
            this.orderForm.find('.submitting').hide();
        }

    }

    async runSetupForm() {
        this.variants = await this.setupForm(this.orderForm);
    }

    init() {
        this.orderForm = $('form#orderForm');
        const self = this;
        // this.orderForm.validator().on('submit', (ev) => {
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

        $('#orderFormContainer').removeClass('invisible');
        $('#loader-wrapper').addClass('loaded');

        this.runSetupForm();        
    }
}


(function () {
    const screen = new BuyScreen();
    screen.init();
})()
