function objectifyForm(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function getVariant(formData, variants) {

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

async function calculateShipping(form, variants) {    
    const formData = objectifyForm(form.serializeArray())

    const variant = getVariant(formData, variants);

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
            // "phone": formData.phone,
        },
        "shipping_address": address,
        // "billing_address": address,
        "line_items": [
            {
                "product_id": "5637ca44df92ea03009633b3",
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
    form.find('#shipping').val((result.shipping /100).toFixed(2))
    form.find('#subtotal').val((result.subtotal / 100).toFixed(2))
    form.find('#tax').val((result.taxes / 100).toFixed(2))
    form.find('#total').val((result.total / 100).toFixed(2))
    form.find('.loading').hide();
}

(async () => {

    const result = await $.ajax({
        url: 'https://wt-f938a32f745f3589d64a35c208dd4c79-0.run.webtask.io/celry-access/products/5637ca44df92ea03009633b3'
    });
    $('#description').html(result.data.description);


    const optionsHtml = result.data.options.map(o => {
        return '<div class="form-group row">' +
            `<label for="${o.id}" class="col-2 col-form-label">${o.name}:</label>` +
            `<select class="form-control col-6" id="option_${o.id}" name="option_${o.id}">` +
            `<option selected value="" disabled>Select ${o.name}</option>` +
                o.values.map(v => {
                    return `<option value="${v.id}">${v.name}</option>`
                }).join('') +
            '</select>' +
            '</div>';        
    }).join('');

    const orderForm = $('form#orderForm');
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

        calculateShipping(orderForm, result.data.variants);
    })

    orderForm.find('#options select').change(ev => {
        calculateShipping(orderForm, result.data.variants);
    });

    orderForm.find('#quantity').change(ev => {
        calculateShipping(orderForm, result.data.variants);
    });

    $('#orderFormContainer').removeClass('invisible');
    $('#loader-wrapper').addClass('loaded');

})();