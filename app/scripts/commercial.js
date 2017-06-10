(function ($) {

    $('.contact-us').click(() => {
        $('#email').animate({left:0,duration:'slow',complete:() => $('#email').focus()});
    })

    var contactBottomCtaWaypoint = new Waypoint({
        element: $('.contact-cta').get(0),
        handler: function (direction) {
            
            if (direction == 'down') {
                $('body').append('<div class="modal-backdrop cta hidden-sm-down"></div>');
                setTimeout(() => $('.modal-backdrop.cta').addClass('show'), 1);
            }
            else {
                const backdrop = $('.modal-backdrop.cta');
                backdrop.removeClass('show');
                setTimeout(() => backdrop.remove(), 500);
            }
        },
        offset: 'bottom-in-view'
    })

    const form = $('#form');
    form.find('#send').on('click', function (ev) {
        ev.preventDefault();

        form.find('#email').parent().toggleClass('has-danger', false)
        form.find('#name').parent().toggleClass('has-danger', false)
        form.find('#company').parent().toggleClass('has-danger', false)
        form.find('#industry').parent().toggleClass('has-danger', false)

        form.find('#send').prop('disabled', true);

        var error = false;
        try {
            var email = form.find('#email').val();
            if (email.trim().length == 0) { form.find('#email').parent().toggleClass('has-danger', true); error = true; }

            var name = form.find('#name').val();
            if (name.trim().length == 0) { form.find('#name').parent().toggleClass('has-danger', true); error = true; }

            var company = form.find('#company').val();
            var industry = form.find('#industry').val();
            var description = form.find('#description').val();

            if (error) return;

            send(email, name, company, industry, description)
                .done(function (res) {
                    alert("Thank you for your contact request. You will hear from us shortly.");
                    form.find('#send').prop('disabled', false);
                })
                .fail(function (err) {
                    alert('Whoops, something went wrong. Please try again later.')
                    form.find('#send').prop('disabled', false);
                });           

        
        }
        catch (err) {
            console.error(err);
            return;
        }
        if (error) { return }

    });

    function send(email, name, company, industry, description) {

        const body = ''
            + 'Commercial contact form \n' 
            + '----------------------------------\n'
            + `Name: ${name}\n`
            + `EMail: ${email}\n`
            + `Company: ${company}\n`
            + `Industry: ${industry}\n`
            + `Description:\n${description}\n\n`;

        var request = {
            "subject": `[Commercial Contact] Contact by ${name}`,
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