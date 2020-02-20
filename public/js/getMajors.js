var mongoData;

$.ajax({
    url: "/getmajors",
    type: "POST",
    success: (data)=>{
        console.log(data);
    },
    error: ()=>{
        console.log('An error occurred communicating with the database');
    }
});

