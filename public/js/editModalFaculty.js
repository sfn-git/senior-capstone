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
$('#editStudentsAbstarct').click(function() {
    $(this).hide();
    $(this).siblings('#closeStudent, #approveStudent, #denyStudent').hide();
    $(this).siblings('#reviewStudent, #cancelStudentReview').show();
});

$('#reviewStudent').click(function() {
    alert("NOTE: Your changes will not save until you press the 'Approve' button.");
    $(this).siblings('#editStudentsAbstarct, #approveStudent, #closeStudent, #denyStudent').show();
    $(this).siblings('#cancelStudentReview').hide();
    $(this).hide();
});

$('#cancelStudentReview,#reviewStudent').click(function() {
    // confirm("Any changes you made, will not be saved! Do you wish to continue?");
    $(this).siblings('#editStudentsAbstarct, #approveStudent, #closeStudent').show();
    $(this).siblings('#reviewStudent').hide();
    $(this).hide();
});

$('#cancelStudentReview,#reviewStudent').click(function() {
    // confirm("Any changes you made, will not be saved! Do you wish to continue?");
    $(this).siblings('#editStudentsAbstarct, #approveStudent, #closeStudent').show();
    $(this).siblings('#reviewStudent').hide();
    $(this).hide();
});

$('#approveStudent').click(function() {
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

$('#denyStudent').click(() =>{
   if(confirm(`Are you sure you would like to deny ${nameGlobal.split(" ")[0]}'s project ${titleGlobal}?`)){
       $.ajax({
        method: "POST",
        url: "/faculty-deny-student",
        data: {id: idGlobal},
        success: (res)=>{
            if(res.status){
                alert(`${nameGlobal.split(" ")[0]}'s project has been denied.`);
                window.location.reload();
            }else{
                alert(`Something went wrong when trying to deny the project: ${res.message}`);
            }
        },
        error: (err)=>{
            alert(`Something went wrong trying to communicate with the server. Please refresh the page and try again.`);
        }

       })
   }else{
       alert(`You did not deny the project.`);
   }
});