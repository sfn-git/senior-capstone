function deleteEntry (id, name){

  if(window.confirm(`Are you sure you would like to remove ${name} from the faculty database?`)){

    $.ajax({
      method: "POST",
      url: "/remove-faculty",
      data: {"id": id},
      success: (res)=>{
        if(res.status){
          window.alert(`${name} has been removed from the database`);
          location.reload();
        } else{
          window.alert(res.message);
          location.reload();
        }
      },
      error:()=>{
        window.alert("An error occurred");
      }
    })

  }

}