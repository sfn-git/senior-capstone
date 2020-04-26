function launchModal(title, status, abstract, primary, coPres, faculty, lastEdit) 
{
  var status = status;
  var lastEdit = lastEdit;
  document.getElementById("title").innerHTML = title
  document.getElementById("status").innerHTML =  "Pending ORSP: #" + status
  document.getElementById("abstractLaunchModal").innerHTML = abstract

  document.getElementById("primary").innerHTML = primary
  document.getElementById("coPres").innerHTML = coPres
  document.getElementById("faculty").innerHTML = faculty
  document.getElementById("lastEdit").innerHTML = "Last edited on " + lastEdit
  } 

function editAbstarct(){
  document.getElementById("abstractLaunchModal").style.borderColor = "grey";
}

function doneEditAbstarct(){
  document.getElementById("abstractLaunchModal").style.borderColor = "white";
}

function editable(){
  var h1 = document.getElementsByTagName("p")[0];
  var att = document.createAttribute("contenteditable");
  att.value = "true";
  h1.setAttributeNode(att);
  }
  
function noteditable(){
  var h1 = document.getElementsByTagName("p")[0];
  var att = document.createAttribute("contenteditable");
  att.value = "flase";
  h1.setAttributeNode(att);
  }
  
  $('edit btn btn-primary').click(function(){
  $(".my-textbox").focus()
  });