// orsp
$('#ORSPedit').click(function() {
    $(this).hide();
    $(this).siblings('#ORSPclose, #ORSPapprove, #ORSPremove').hide();
    $(this).siblings('#ORSPsave, #ORSPcancel').show();
});

$('#ORSPsave').click(function() {
    if($("#noteLaunchModal").val() == noteGlobal){
        $(this).siblings('#ORSPedit, #ORSPapprove, #ORSPremove, #ORSPclose').show();
        $(this).siblings('#ORSPcancel').hide();
        $(this).hide();
    }else{
        $.ajax({

            method: "POST",
            url: "/orsp-add-note",
            data: {id: idGlobal, note: $("#noteLaunchModal").val()},
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

$('#ORSPcancel').click(function() {
    // confirm("Any changes you made, will not be saved! Do you wish to continue?");
    $(this).siblings('#ORSPedit, #ORSPapprove, #ORSPremove, #ORSPclose').show();
    $(this).siblings('#ORSPsave').hide();
    $(this).hide();
});

$('#ORSPapprove').click(()=> {
    if(window.confirm(`Approve Project ID: ${idGlobal}?`)){
        $.ajax({
            method: "POST",
            url: "/orsp-approve-student",
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

$('#ORSPremove').click(()=>{

    if(window.confirm(`Are you sure you would like to redact project ${idGlobal}`)){

        $.ajax({
            method: "POST",
            url: "/orsp-deny-student",
            data: {id: idGlobal},
            success:(res) =>{
                if(res.status){
                    window.alert(`${idGlobal} has been removed.`)
                    location.reload();
                }else{
                    window.alert(res.message);
                }
            }
        })
    }
})