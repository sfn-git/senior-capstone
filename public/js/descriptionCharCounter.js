$(document).ready(function () {
    var text_max = 3500;
    $('#descriptionCharRemaining').html(text_max + ' characters remaining of ' + text_max + '.');

    $('#description').keyup(function () {
        var text_length = $('#description').val().length;
        var text_remaining = text_max - text_length;

        $('#descriptionCharRemaining').html(text_remaining + ' characters remaining of ' + text_max + '.');
    });
});
