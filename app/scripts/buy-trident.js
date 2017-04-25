(async () => {

    const result = await $.ajax({
        url: 'https://api.trycelery.com/v2/products/5637ca44df92ea03009633b3', //Trident
        // url: 'https://api.trycelery.com/v2/products/57e9bd02726ecc1100f4204a', //Test
        headers: { 'Authorization': '44aea5eaf148dbabee4236553f2d805a3e8e84668d040d7f75198420ee486b0798b87f851db9ade8394e7f2c8c6e3250 https://api.trycelery.com/v2/products/5637ca44df92ea03009633b3' }
    });
    $('#description').html(result.data.description);


    const optionsHtml = result.data.options.map(o => {
        return '<div class="form-group row">' +
            `<label for="${o.id}" class="col-2 col-form-label">${o.name}:</label>` +
            `<select class="form-control col-6" id="${o.id}">` +
            '<option selected value="" disabled>-- select option</option>' +
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
    })

    $('#orderFormContainer').removeClass('invisible');
    $('#loader-wrapper').addClass('loaded');

})();