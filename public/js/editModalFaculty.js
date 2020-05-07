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

//student
$('#Sedit').click(function() {
    $(this).hide();
    $(this).siblings('#Sclose, #Sapprove').hide();
    $(this).siblings('#Ssave, #Scancel').show();
});

$('#Ssave').click(function() {
    // confirm("Confirm changes");
    $(this).siblings('#Sedit, #Sapprove, #Sclose').show();
    $(this).siblings('#Scancel').hide();
    $(this).hide();
});

$('#Scancel').click(function() {
    // confirm("Any changes you made, will not be saved! Do you wish to continue?");
    $(this).siblings('#Sedit, #Sapprove, #Sclose').show();
    $(this).siblings('#Ssave').hide();
    $(this).hide();
});

$('#Sapprove').click(function() {
    if(confirm("Do you confirm that this is the final abstract revision")){

        var sendData = {
            id: idGlobal,
            abstractUpdated: $("#studentAbstractLaunchModal").val()
        }

        $.ajax({

            method: "POST",
            url: "/faculty-approve-student",
            data: sendData,
            success: (res)=>{

                if(res.status){
                    window.alert("Abstract successfully approved!");
                    location.reload();
                }else{
                    window.alert(res.message);
                }

            }

        })

    }
});

