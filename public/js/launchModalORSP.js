var idGlobal;
function launchORSPModal(
  note,
  status,
  title,
  id,
  abstract,
  primary,
  coPres,
  faculty,
  lastEdit
) {
  idGlobal = id;
  document.getElementById("studentTitle").innerHTML = title;

  //change badge color in modal
  if(status == 'Pending ORSP') {
    document.getElementById("studentSubmissionID").className = "badge badge-info";
  }
  else if(status == 'Approved') {
    document.getElementById("studentSubmissionID").className = "badge badge-success";
  }
  else if(status == 'Denied') {
    document.getElementById("studentSubmissionID").className = "badge badge-danger";
  }
  else if(status == 'Pending Faculty') {
    document.getElementById("studentSubmissionID").className = "badge badge-info";
  }
  else if(status == 'Pending PPT') {
    document.getElementById("studentSubmissionID").className = "badge badge-warning";
  }
  else {
    document.getElementById("studentSubmissionID").className = "badge badge-warning";
  }

  document.getElementById("studentSubmissionID").innerHTML = status + ": #" + id;
  if (status == "Pending ORSP"){
    document.getElementById("ORSPedit").style.visibility = "visible";
    document.getElementById("ORSPapprove").style.visibility = "visible";
  }
  else {
    document.getElementById("ORSPedit").style.visibility = "hidden";
    document.getElementById("ORSPapprove").style.visibility = "hidden";
  }
  document.getElementById("StudentAbstractLaunchModal").innerHTML = abstract;
  document.getElementById("abstractLaunchModal").innerHTML = note;
  document.getElementById("studentPrimary").innerHTML = primary;
  document.getElementById("studentCoPres").innerHTML = coPres;
  document.getElementById("studentFaculty").innerHTML = faculty;
  document.getElementById("studentLastEdit").innerHTML = "Last edited on " + lastEdit;
}
  
  // Make div border grey to see it when in edit mode
  function editAbstarct() {
    document.getElementById("abstractLaunchModal").style.borderColor = "grey";
    document.getElementById("abstractLaunchModal").readOnly = false;
  }
  
  // Make div border white to hide it when not in edit mode
  function doneEditAbstarct() {
    document.getElementById("abstractLaunchModal").style.borderColor = "white";
    document.getElementById("abstractLaunchModal").readOnly = true;
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