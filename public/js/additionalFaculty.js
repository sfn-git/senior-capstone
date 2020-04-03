var counter = 1;
var limit = 30;

function addFaculty(divName) {
  if (counter == limit) {
    alert(
      "You have reached the limit of faculty memebers. If you wish to add more, please contact the Research Days at (908) 737-3461 or researchdays@kean.edu."
    );
  } else {
    counter++;
    $("#delete").attr("hidden", false);
    $("#facultyCount").val(counter);
    var newdiv = document.createElement("div");
    newdiv.innerHTML +=
      `<div id=additionalFaculty` +
      counter +
      `><div class="form-group row mt-4 col-md-12">
        <h5>Faculty Member ` +
      counter +
      `</h5>
    </div>
    <div class="row">
        <div class="form-group col-md-3">
            <label for="firstName` +
      counter +
      `">First name</label>
            <input type="text" class="form-control" id="firstName` +
      counter +
      `" name="firstName` +
      counter +
      `" required="true">
        </div>
        <div class="form-group col-md-3">
            <label for="lastName` +
      counter +
      `">Last name</label>
            <input type="text" class="form-control" id="lastName` +
      counter +
      `" name="lastName` +
      counter +
      `" required="true">
        </div>
        <div class="form-group col-md-2">
            <label for="facultyPosition` +
      counter +
      `">Position</label>
            <select name="facultyPosition` +
      counter +
      `" required id="facultyPosition` +
      counter +
      `" class="form-control">
                <option disabled selected value></option>
                <option value="Tenure-Track">Tenure-Track</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Adjunct">Adjunct</option>
                <option value="Staff">Staff</option>
                <option value="Assistant Professor">Assistant Professor</option>
            </select>
        </div>
        
    </div>
    <div class="row">
        <div class="form-group col-md-3">
            <label for="campus` +
      counter +
      `">Campus</label>
            <select id="campus` +
      counter +
      `" name="campus` +
      counter +
      `" class="form-control" required="true">
                <option disabled selected value></option>
                <option value="Union">Union (Main)</option>
                <option value="Wenzhou">Wenzhou (China)</option>
                <option value="Ocean">Ocean (Toms River)</option>
                <option value="Skylands">Skylands (Oak Ridge)</option>
            </select>
        </div>
        <div class="form-group col-md-3">
            <label for="keanEmail` +
      counter +
      `">Email Address</label>
            <div class="input-group">
                <input type="text" class="form-control" id="keanEmail` +
      counter +
      `" name="keanEmail` +
      counter +
      `" required="true">
                <div class="input-group-append">
                    <span class="input-group-text" id="keanEmail">@kean.edu</span>
                </div>
            </div>
        </div>
    </div>
    `;
    document.getElementById(divName).appendChild(newdiv);
    var select = document.getElementById("major" + counter);
  }
}

function deleteFaculty() {
  $("#delete").attr("hidden", false);
  var lastAdditionalFaculty = document.getElementById(
    "additionalFaculty" + counter
  );
  lastAdditionalFaculty.remove();
  counter--;
  if (counter <= 1) {
    $("#delete").attr("hidden", true);
  }
  $("#facultyCount").val(counter);
}
