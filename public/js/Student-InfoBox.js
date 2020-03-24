        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.maxHeight)
                {
                    content.style.maxHeight = null;
                }
                else
                {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
  }

        var step = 4;
        if (step == 1){
            document.getElementById("Step").innerHTML = "Your submission is being reviwed by ORSP";
            document.getElementById("status").innerHTML = "<p style='color: red' font-size: 20px><b>Incomplete</b></p>";
          }
        else if (step == 2){
            document.getElementById("Step").innerHTML = "Your submission is being checkd by all listed professors";
            document.getElementById("status").innerHTML = "<p style='color: red' font-size: 20px><b>Incomplete</b></p>";
        }
        else if (step == 3){
          document.getElementById("Step").innerHTML = "PDF, Word Doc, MP4 submission required";
          document.getElementById("status").innerHTML = "<p style='color: red' font-size: 20px><b>Incomplete</b></p>";
        }
        else{
          document.getElementById("Step").innerHTML = "All steps have been completed! See you at Research day";
          document.getElementById("status").innerHTML = "<p style='color: green'><b>Complete</b></p>";
        }
