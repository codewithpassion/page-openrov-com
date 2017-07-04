(function ($) {


    var sentIds = [];
    $('.contact-us').click(() => {
        $('#email').animate({left:0,duration:'slow',complete:() => $('#email').focus()});
    })

    function closeBackdrop(backdrop) {
        backdrop.removeClass('show');
        setTimeout(() => backdrop.remove(), 500);
    }

    var contactBottomCtaWaypoint = new Waypoint({
        element: $('.contact-cta').get(0),
        handler: function (direction) {
            
            if (direction == 'down') {
                $('body').append('<div class="modal-backdrop cta hidden-sm-down"></div>');
                setTimeout(() => {
                    $('.modal-backdrop.cta')
                        .addClass('show')
                        .click(function() { closeBackdrop($(this)) });                    
                }, 1);
            }
            else {
                closeBackdrop($('.modal-backdrop.cta'));
            }
        },
        offset: 'bottom-in-view'
    })

    const form = $('#form');
    form.find('#uniqueId').val(new Date().valueOf());
    form.find('#send').on('click', function (ev) {
        ev.preventDefault();

        let uniqueIdField = form.find('#uniqueId');
        let uniqueId = uniqueIdField.val();
        if (sentIds.indexOf(uniqueId) >= 0) {
            return;
        }
        else {
            sentIds.push(uniqueId);
        }

        form.find('#email').parent().toggleClass('has-danger', false)
        form.find('#phone').parent().toggleClass('has-danger', false)
        form.find('#name').parent().toggleClass('has-danger', false)
        form.find('#company').parent().toggleClass('has-danger', false)
        form.find('#industry').parent().toggleClass('has-danger', false)
        form.find('#website').parent().toggleClass('has-danger', false)

        form.find('#send').prop('disabled', true);

        var error = false;
        try {
            var email = form.find('#email').val();
            if (email.trim().length == 0) { form.find('#email').parent().toggleClass('has-danger', true); error = true; }

            var name = form.find('#name').val();
            if (name.trim().length == 0) { form.find('#name').parent().toggleClass('has-danger', true); error = true; }

            var phone = form.find('#phone').val();
            var company = form.find('#company').val();
            var industry = form.find('#industry').val();
            var description = form.find('#description').val();
            var website = form.find('#website').val();

            if (error) return;

            send(email, name, phone, company, industry, description, website)
                .done(function (res) {
                    alert("Thank you for your contact request. You will hear from us shortly.");
                    form.find('#send').prop('disabled', false);
                    uniqueIdField.val(new Date().valueOf());
                })
                .fail(function (err) {
                    alert('Whoops, something went wrong. Please try again later.')
                    form.find('#send').prop('disabled', false);
                    uniqueIdField.val(new Date().valueOf());
                });           
        }
        catch (err) {
            console.error(err);
            return;
        }
        if (error) { return }

    });

    function send(email, name, phone, company, industry, description, website) {

        const body = ''
            + 'Commercial contact form \n' 
            + '----------------------------------\n'
            + `Name: ${name}\n`
            + `EMail: ${email}\n`
            + `Phone: ${phone}\n`
            + `Company: ${company}\n`
            + `Industry: ${industry}\n`
            + `Website: ${website}\n`
            + `Description:\n${description}\n\n`;

        var request = {
            "subject": `[Commercial Contact] By ${name}`,
            "tags": ["web", "request", "commercial"],
            "via_id": 48,
            "comment": {
                "body": body,
            },
            "requester":
            {
                "name": name,
                "email": email,
                "locale_id": 1
            },
            "fields": {
            }
        };

        return $.ajax({
            type: "POST",
            url: 'https://openrov.zendesk.com/api/v2/requests.json',
            data: JSON.stringify({ request: request }),
            dataType: 'json',
            contentType: "application/json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(email + '/token:BO4MEQQtX70i6kDJqFmUb5voRNo8OPs2qcyGISBz'));
            }
        });

    }

})($) 