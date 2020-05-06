$('#edit').click(function() {
    $(this).hide();
    $(this).siblings('#close, #approve').hide();
    $(this).siblings('#save, #cancel').show();
});

$('#save').click(function() {
    // confirm("Confirm changes");
    $(this).siblings('#edit, #approve, #close').show();
    $(this).siblings('#cancel').hide();
    $(this).hide();
});

$('#cancel').click(function() {
    // confirm("Any changes you made, will not be saved! Do you wish to continue?");
    $(this).siblings('#edit, #approve, #close').show();
    $(this).siblings('#save').hide();
    $(this).hide();
});

$('#approve').click(function() {
    confirm("Do you confirm that this is the final abstract revision");
});

// orsp
$('#ORSPedit').click(function() {
    $(this).hide();
    $(this).siblings('#ORSPclose, #ORSPapprove').hide();
    $(this).siblings('#ORSPsave, #ORSPcancel').show();
});

$('#ORSPsave').click(function() {
    // confirm("Confirm changes");
    $(this).siblings('#ORSPedit, #ORSPapprove, #ORSPclose').show();
    $(this).siblings('#ORSPcancel').hide();
    $(this).hide();
});

$('#ORSPcancel').click(function() {
    // confirm("Any changes you made, will not be saved! Do you wish to continue?");
    $(this).siblings('#ORSPedit, #ORSPapprove, #ORSPclose').show();
    $(this).siblings('#ORSPsave').hide();
    $(this).hide();
});

$('#ORSPapprove').click(function() {
    confirm("Do you confirm that this is the project is aproved");
});