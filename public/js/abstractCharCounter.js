$(document).ready(function () {
    var text_max = 750;
    $('#abstractCharRemaining').html(text_max + ' characters remaining of ' + text_max + '.');

    $('#abstract').keyup(function () {
        var text_length = $('#abstract').val().length;
        var text_remaining = text_max - text_length;

        $('#abstractCharRemaining').html(text_remaining + ' characters remaining of ' + text_max + '.');
    });
});
