function statusFunction(num) {
  var step = num;
  if (step == 1) {
      document.getElementById("Step").innerHTML = "Your submission is being reviwed by ORSP";
      document.getElementById("statusBar").innerHTML = "<p style='color: red' font-size: 20px><b>Incomplete</b></p>";
  } else if (step == 2) {
      document.getElementById("Step").innerHTML = "Your submission is being checkd by all listed professors";
      document.getElementById("statusBar").innerHTML = "<p style='color: red' font-size: 20px><b>Incomplete</b></p>";
  } else if (step == 3) {
      document.getElementById("Step").innerHTML = "PDF, Word Doc, MP4 submission required";
      document.getElementById("statusBar").innerHTML = "<p style='color: red' font-size: 20px><b>Incomplete</b></p>";
      document.getElementById("powerpoint").innerHTML = "<form action='/action_page.php'>" +
      "<label for='myfile'>Select a file: </label>" +
      "<input type='file' id='myfile' name='myfile>Choose File </input>" + "<br><br>"+
      "<input type='submit value='Submit'> Submit</form>";

  } else {
      document.getElementById("Step").innerHTML = "All steps have been completed! See you at Research day";
      document.getElementById("statusBar").innerHTML = "<p style='color: green' font-size: 20px><b>Complete</b></p>";
  }
}
