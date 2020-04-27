$('#edit').click(function() {
    $(this).hide();
    $(this).siblings('#close').hide();
    $(this).siblings('#save, #cancel').show();
});

$('#save').click(function() {
    confirm("Confirm changes");
    $(this).siblings('#edit, #close').show();
    $(this).siblings('#cancel').hide();
    $(this).hide();
});

$('#cancel').click(function() {
    confirm("Any changes you made, will not be saved! Do you wish to continue?");
    $(this).siblings('#edit, #close').show();
    $(this).siblings('#save').hide();
    $(this).hide();
});

