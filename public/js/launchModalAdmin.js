var idGlobal;
var noteGlobal;
function launchAdminModal(
  note,
  status,
  title,
  id,
  abstract,
  description,
  primary,
  coInve,
  students,
  lastEdit
) {
  idGlobal = id;
  noteGlobal = note;
  document.getElementById("title").innerHTML = title;

  //change badge color in modal
  if(status == 'Pending Approval') {
    document.getElementById("status").className = "badge badge-warning";
  }
  else if(status == 'Approved') {
    document.getElementById("status").className = "badge badge-success";
  }
  else if(status == 'Denied') {
    document.getElementById("status").className = "badge badge-danger";
  }
  else {
    document.getElementById("status").className = "badge badge-warning";
  }

  document.getElementById("status").innerHTML = status + ": #" + id;
  if (status == "Pending Approval"){
    document.getElementById("adminApprove").style.visibility = "visible";
    document.getElementById("adminDeny").style.visibility = "visible";
  }
  else {
    document.getElementById("adminApprove").style.visibility = "hidden";
    document.getElementById("adminDeny").style.visibility = "hidden";
  }
  document.getElementById("adminAbstarct").innerHTML = abstract;
  document.getElementById("description").innerHTML = description;
  $("#AdminNoteLaunchModal").val(note);
  document.getElementById("primary").innerHTML = primary;
  document.getElementById("coInve").innerHTML = coInve;
  document.getElementById("students").innerHTML = students;
  document.getElementById("lastEdit").innerHTML = "Last edited on " + lastEdit;
}
  
  // Make div border grey to see it when in edit mode
  function editAbstarct() {
    document.getElementById("AdminNoteLaunchModal").style.borderColor = "grey";
    document.getElementById("AdminNoteLaunchModal").readOnly = false;
  }
  
  // Make div border white to hide it when not in edit mode
  function doneEditAbstarct() {
    document.getElementById("AdminNoteLaunchModal").style.borderColor = "white";
    document.getElementById("AdminNoteLaunchModal").readOnly = true;
  }
  
  //make the div editable
  function editable() {
    var h1 = document.getElementsByTagName("input")[0];
    var att = document.createAttribute("contenteditable");
    att.value = "true";
    h1.setAttributeNode(att);
  }
  
  //make the div none editable
  function noteditable() {
    var h1 = document.getElementsByTagName("input")[0];
    var att = document.createAttribute("contenteditable");
    att.value = "flase";
    h1.setAttributeNode(att);
  }
  
  $("edit btn btn-primary").click(function () {
    $(".my-textbox").focus();
  });