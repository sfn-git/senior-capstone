console.log("script loaded");
$("button[name = 'popModal']").click(function(){
    console.log("modal clicked");
    var text_max = 750;
    var text_length = $('#studentAbstractLaunchModal').val().length;
    $('#abstractCharRemaining').html(text_max - text_length + ' characters remaining of ' + text_max + '.');

    $('#studentAbstractLaunchModal').keyup(function () {
        var text_length = $('#studentAbstractLaunchModal').val().length;
        var text_remaining = text_max - text_length;

        $('#abstractCharRemaining').html(text_remaining + ' characters remaining of ' + text_max + '.');
    });
});



   

