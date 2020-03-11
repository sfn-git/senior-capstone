// $.ajax({
//     url: "/getmajors",
//     type: "POST",
//     success: (dbdata)=>{
//         drawTable(dbdata);
//     },
//     error: ()=>{
//         console.log('An error occurred communicating with the database');
//         drawTable({major: "Error in Database :(", college: ""});
//     }
// });

 
function deleteEntry(id, major){

    id = {"id": id};

    if(window.confirm(`Would you like to delete ${major}?`)){
        $.ajax({

            method: "POST",
            url: "/remove-major",
            data: id,
            success: (response)=>{
                if(response){
                    window.alert("Entry Deleted Successfully");
                    location.reload();
                }else{
                    window.alert("Something Went Wrong :(");
                    location.reload();
                }
            },
            error: ()=>{
                window.alert("An error occured");
            }

        });
    }else{
        
    }

}