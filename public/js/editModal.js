$('#edit').click(function() {
    $(this).hide();
    $(this).siblings('#save, #cancel').show();
});
$('#cancel').click(function() {
    confirm("Any changes you made, will not be saved! Do you wish to continue?");
    $(this).siblings('#edit').show();
    $(this).siblings('#save').hide();
    $(this).hide();
});
$('#save').click(function() {
    confirm("Confirm changes");
    $(this).siblings('#edit').show();
    $(this).siblings('#cancel').hide();
    $(this).hide();
});