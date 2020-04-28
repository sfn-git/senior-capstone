
// output information into modal
function launchModal(step, title, status, abstract, primary, coPres, faculty, lastEdit) 
{
  var status = status;
  var lastEdit = lastEdit;
  document.getElementById("title").innerHTML = title
  document.getElementById("status").innerHTML = step + ": #" + status
  // need to know what status their are
  if(step == "Upload Required"){
    document.getElementById("IPO").style.visibility = "visible";
  }
  
  document.getElementById("abstractLaunchModal").innerHTML = abstract

  document.getElementById("primary").innerHTML = primary
  document.getElementById("coPres").innerHTML = coPres
  document.getElementById("faculty").innerHTML = faculty
  document.getElementById("lastEdit").innerHTML = "Last edited on " + lastEdit
  } 

// Make div border grey to see it when in edit mode
function editAbstarct(){
  document.getElementById("abstractLaunchModal").style.borderColor = "grey";
}

// Make div border white to hide it when not in edit mode
function doneEditAbstarct(){
  document.getElementById("abstractLaunchModal").style.borderColor = "white";
}

//make the div editable
function editable(){
  var h1 = document.getElementsByTagName("p")[0];
  var att = document.createAttribute("contenteditable");
  att.value = "true";
  h1.setAttributeNode(att);
  }
  
//make the div none editable 
function noteditable(){
  var h1 = document.getElementsByTagName("p")[0];
  var att = document.createAttribute("contenteditable");
  att.value = "flase";
  h1.setAttributeNode(att);
  }
  
  $('edit btn btn-primary').click(function(){
  $(".my-textbox").focus()
  });

  function bs_input_file() {
    $(".input-file").before(
      function() {
        if ( ! $(this).prev().hasClass('input-ghost') ) {
          var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
          element.attr("name",$(this).attr("name"));
          element.change(function(){
            element.next(element).find('input').val((element.val()).split('\\').pop());
          });
          $(this).find("button.btn-choose").click(function(){
            element.click();
          });
          $(this).find("button.btn-reset").click(function(){
            element.val(null);
            $(this).parents(".input-file").find('input').val('');
          });
          $(this).find('input').css("cursor","pointer");
          $(this).find('input').mousedown(function() {
            $(this).parents('.input-file').prev().click();
            return false;
          });
          return element;
        }
      }
    );
  }
  $(function() {
    bs_input_file();
  });