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

function deleteEntry(id, major) {
  id = { id: id };

  if (window.confirm(`Would you like to delete ${major}?`)) {
    $.ajax({
      method: "POST",
      url: "/remove-major",
      data: id,
      success: (response) => {
        if (response) {
          window.alert("Entry Deleted Successfully");
          location.reload();
        } else {
          window.alert("Something Went Wrong :(");
          location.reload();
        }
      },
      error: () => {
        window.alert("An error occurred");
      },
    });
  } else {
  }
}

document.getElementById("majorFile").addEventListener("change", upload, false);
function upload() {
  var ajaxObject = {};
  console.log("File uploaded");
  var file = document.getElementById("majorFile").files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    var count = 0;
    lines = reader.result.split("\n");
    lines.forEach((element) => {
      if (count == 0) {
        count++;
      } else {
        var major = element.split("\t")[0];
        var department = element.split("\t")[1];
        var college = element.split("\t")[2].split("\r")[0];
        ajaxObject[count] = {
          major: major,
          dept: department,
          college: college,
        };
        count++;
      }
    });
  };

  if (
    window.confirm(
      "File has been successfully parsed, would you like to commit majors to the database?"
    )
  ) {
    $.ajax({
      method: "POST",
      url: "/insert-file",
      data: ajaxObject,
      success: (response) => {
        window.alert("Response from backend");
        location.reload();
      },
      error: () => {
        window.alert("An error occurred");
        location.reload();
      },
    });
  }
}
