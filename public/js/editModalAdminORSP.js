// orsp
$('#adminNote').click(function() {
    $(this).hide();
    $(this).siblings('#adminClose, #adminApprove, #adminDeny').hide();
    $(this).siblings('#adminSave, #adminCloseNote').show();
});

$('#adminSave').click(function() {
    if($("#AdminNoteLaunchModal").val() == noteGlobal){
        $(this).siblings('#adminNote, #adminApprove, #adminDeny, #adminClose').show();
        $(this).siblings('#adminCloseNote').hide();
        $(this).hide();
    }else{
        $.ajax({

            method: "POST",
            url: "/orsp-add-note-faculty",
            data: {id: idGlobal, note: $("#AdminNoteLaunchModal").val()},
            success: (res)=>{
                if(res.status){
                    location.reload();
                }else{
                    window.alert(`Something went wrong adding your note: ${res.message}`)
                }
            },
            error: ()=>{
                window.alert("Could not save note");
            }
        })
    }
});

$('#adminCloseNote').click(function() {
    // confirm("Any changes you made, will not be saved! Do you wish to continue?");
    $(this).siblings('#adminNote, #adminApprove, #adminDeny, #adminClose').show();
    $(this).siblings('#adminSave').hide();
    $(this).hide();
});

$('#adminApprove').click(()=> {
    if(window.confirm(`Approve Project ID: ${idGlobal}?`)){
        $.ajax({
            method: "POST",
            url: "/orsp-approve-faculty",
            data: {id: idGlobal},
            success: (res) => {
                if(res.status){
                    window.alert(`${idGlobal} has been marked as approved.`)
                    location.reload();
                }else{
                    window.alert(res.message);
                }
            }
        })
    }
});

$('#adminDeny').click(()=>{

    if(window.confirm(`Are you sure you would like to redact project #${idGlobal}?`)){

        $.ajax({
            method: "POST",
            url: "/orsp-deny-faculty",
            data: {id: idGlobal},
            success:(res) =>{
                if(res.status){
                    window.alert(`${idGlobal} has been denied.`);
                    window.location.reload();
                }else{
                    window.alert(res.message);
                }
            },
            error:(err)=>{
                alert("Something went wrong.");
            }
        })
    }
})