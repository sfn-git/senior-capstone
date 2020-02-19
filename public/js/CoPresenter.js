var counter = 1;
var limit = 31;

function AddCoPres(divName)
{
   if (counter == limit)
   {
        alert("You have reached the limit of adding Co-presenters. If you wish to add more please contact ORSP offices at (111)111-1111 or orsp@kean.edu.");
   }
   else
   {
        var newdiv = document.createElement('div');
        newdiv.innerHTML += "<div id=DivForCP" + counter + ">"+
        //delete after decision is made on morder
        "<hr class='CPdivider'>" +
        "<h5>Co-Presenter " + counter + "</h5>" +
        "<div class='row'>"+
            "<div class='form-group col-md-3'>"+
                "<label for='firstName'>First name</label>"+
                "<input type='text' class='form-control' id='firstName' required='true'>"+
            "</div>"+
            "<div class='form-group col-md-3'>"+
                "<label for='lastName'>Last name</label>"+
                "<input type='text' class='form-control' id='lastName' required='true'>"+
            "</div>"+
            "<div class='form-group col-md-2'>"+
                "<label for='keanID'>Student ID</label>"+
                "<input type='number' class='form-control' id='keanID' min='0' max='9999999' required='true'>"+
            "</div>"+
            "<div class='form-group col-md-4 '>"+
                "<label for='keanEmail'>Email Address</label>"+
                "<div class='input-group'>"+
                    "<input type='text' class='form-control' id='keanEmail' required='true'>"+
                    "<div class='input-group-append'>"+
                        "<span class='input-group-text' id='keanEmail'>@kean.edu</span>"+
                    "</div>"+
                "</div>"+
            "</div>"+
        "</div>"+
        "<div class='row'>"+
            "<div class='form-group col-md-6'>"+
                "<label for='major'>Major</label>"+
                    "<select id='major' class='form-control' required='true'>"+
                        "<option></option>"+
                        "<option>Computer Science (Cyber Security Option)</option>"+
                    "</select>"+
            "</div>"+
            "<div class='form-group col-md-3'>"+
                "<label for='class'>Class Level</label>"+
                "<select id='class' class='form-control' required='true'>"+
                    "<option></option>"+
                    "<option value='Freshman'>Freshman</option>"+
                    "<option value='Sophomore'>Sophomore</option>"+
                    "<option value='Junior'>Junior</option>"+
                    "<option value='Senior'>Senior</option>"+
                    "<option value='Graduate'>Graduate</option>"+
                "</select>"+
            "</div>"+
            "<div class='form-group col-md-3'>"+
                "<label for='campus'>Campus</label>"+
                "<select id='campus' class='form-control' required='true'>"+
                    "<option></option>"+
                    "<option value='Union'>Union (Main)</option>"+
                    "<option value='Wenzhou'>Wenzhou (China)</option>"+
                    "<option value='Ocean'>Ocean (Toms River)</option>"+
                    "<option value='Skylands'>Skylands (Oak Ridge)</option>"+
                "</select>"+
            "</div>"+
        "</div><br>";
        document.getElementById(divName).appendChild(newdiv);
        counter++;

        if (counter>=1)
      {
            // var m = document.getElementById("Delete");???????? might not need
            //$('Delete').removeAttr('hidden');
        }
   }
}
   function DeleteCoPres()
   {


       if(counter<=1)
       {
         alert("you have not added any co-presneters yet");
          // $('#Delete').attr('hidden', 'true');
       }
       else
       {
         counter--;

           var RemLastCPform = document.getElementById("DivForCP" + counter);
           RemLastCPform.remove();
       }
     }