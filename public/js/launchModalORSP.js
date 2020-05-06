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
  }
  
  // Make div border white to hide it when not in edit mode
  function doneEditAbstarct() {
    document.getElementById("abstractLaunchModal").style.borderColor = "white";
  }
  
  //make the div editable
  function editable() {
    var h1 = document.getElementsByTagName("p.orsp")[0];
    var att = document.createAttribute("contenteditable");
    att.value = "true";
    h1.setAttributeNode(att);
  }
  
  //make the div none editable
  function noteditable() {
    var h1 = document.getElementsByTagName("p.orsp")[0];
    var att = document.createAttribute("contenteditable");
    att.value = "flase";
    h1.setAttributeNode(att);
  }
  
  $("edit btn btn-primary").click(function () {
    $(".my-textbox").focus();
  });