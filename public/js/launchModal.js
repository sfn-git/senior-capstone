function launchModal(title, status, abstract, primary, coPres, faculty, lastEdit) 
{
  var status = status;
  var lastEdit = lastEdit;
    document.getElementById("title").innerHTML = title
    document.getElementById("status").innerHTML =  "Pending ORSP: #" + status
    document.getElementById("abstract").innerHTML = abstract

    document.getElementById("primary").innerHTML = primary
    document.getElementById("coPres").innerHTML = coPres
    document.getElementById("faculty").innerHTML = faculty
    document.getElementById("lastEdit").innerHTML = "Last edited on " + lastEdit
  } 