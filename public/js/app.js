(function(){

    'use strict';

    function disableButtons(state) {
        $("#sync").prop('disabled', state);
        $("#async").prop('disabled', state);
    };

    function uploadFile() {

        const fd = new FormData();
        fd.append('archive', $('#archive')[0].files[0]);

        disableButtons(true);

        $.ajax({
            url: '/fileInfo',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST'
        })
        .done(response => alert(JSON.stringify(response)))
        .fail(err => alert(JSON.stringify(err.responseJSON)))
        .always(() => disableButtons(false));

    };

    $('document').ready(() => {
        $("#async").click(uploadFile);
    });

})();