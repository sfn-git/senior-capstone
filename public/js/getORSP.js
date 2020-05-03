function deleteEntry(id, email){

    if(window.confirm("Are you sure you would like to delete this entry?")){
        $.ajax({

            method: "POST",
            url: "/remove-orsp-staff",
            data: {"id": id, "email": email},
            success: (res)=>{
                if(res.status){
                    window.alert(res.message);
                    location.reload();
                }else{
                    window.alert(res.message);
                    location.reload();
                }
            },
            error:()=>{
                window.alert("Something went wrong. Please try again");
                window.reload();
            }
        })
    }
}