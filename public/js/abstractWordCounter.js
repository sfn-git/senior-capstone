$(document).ready(function () {
    var text_max = 750;
    $('#charactersRemaining').html(text_max + ' characters remaining of 750.');

    $('#abstract').keyup(function () {
        var text_length = $('#abstract').val().length;
        var text_remaining = text_max - text_length;

        $('#charactersRemaining').html(text_remaining + ' characters remaining of 750.');
    });
});
