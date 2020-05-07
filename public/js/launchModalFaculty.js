// output information into modal

function launchStudentModal(
    status,
    title,
    id,
    abstract,
    primary,
    coPres,
    faculty,
    lastEdit
  ) {
    document.getElementById("studentTitle").innerHTML = title;
    document.getElementById("studentSubmissionID").innerHTML = status + ": #" + id;
    if (status == "Pending Faculty") {
      document.getElementById("Sedit").style.visibility = "visible";
      document.getElementById("Sapprove").style.visibility = "visible";
    }
    else {
      document.getElementById("Sedit").style.visibility = "hidden";
      document.getElementById("Sapprove").style.visibility = "hidden";
    }
    document.getElementById("studentAbstractLaunchModal").innerHTML = abstract;
    document.getElementById("studentPrimary").innerHTML = primary;
    document.getElementById("studentCoPres").innerHTML = coPres;
    document.getElementById("studentFaculty").innerHTML = faculty;
    document.getElementById("studentLastEdit").innerHTML = "Last edited on " + lastEdit;
  }
  
  function launchFacultySubmissionModal(
    step,
    title,
    id,
    abstract,
    description,
    primary,
    coPres,
    faculty,
    lastEdit
  ) {
    console.log("Test Faculty");
    document.getElementById("title").innerHTML = title;
    document.getElementById("status").innerHTML = step + ": #" + id;
    // need to know what status their are
    if (step == "Upload Required") {
      document.getElementById("IPO").style.visibility = "visible";
      $("#customFile").on('change', ()=>{
        console.log(status);
        $("input[id^='fileID']").attr('value', status);
      })
    }
    else if (step == "Faculty Review"){
      document.getElementById("edit").style.visibility = "visible";
      document.getElementById("approve").style.visibility = "visible";
    }
    
    document.getElementById("abstractLaunchModal").innerHTML = abstract;
    document.getElementById("description").innerHTML = description;
    document.getElementById("primary").innerHTML = primary;
    document.getElementById("coPres").innerHTML = coPres;
    document.getElementById("faculty").innerHTML = faculty;
    document.getElementById("lastEdit").innerHTML = "Last edited on " + lastEdit;
  }
  
  // Make div border grey to see it when in edit mode
  function editAbstarct() {
    document.getElementById("studentAbstractLaunchModal").style.borderColor = "grey";
  }
  
  // Make div border white to hide it when not in edit mode
  function doneEditAbstarct() {
    document.getElementById("studentAbstractLaunchModal").style.borderColor = "white";
  }
  
  //make the div editable
  function editable() {
    var h1 = document.getElementsByTagName("ps")[0];
    var att = document.createAttribute("contenteditable");
    att.value = "true";
    h1.setAttributeNode(att);
  }
  
  //make the div none editable
  function noteditable() {
    var h1 = document.getElementsByTagName("ps")[0];
    var att = document.createAttribute("contenteditable");
    att.value = "flase";
    h1.setAttributeNode(att);
  }
  
  $("edit btn btn-primary").click(function () {
    $(".my-textbox").focus();
  });
  