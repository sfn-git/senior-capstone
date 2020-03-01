// $.ajax({
//     url: "/getmajors",
//     type: "POST",
//     success: (dbdata)=>{
//         drawTable(dbdata);
//     },
//     error: ()=>{
//         console.log('An error occurred communicating with the database');
//         drawTable({major: "Error in Database :(", college: ""});
//     }
// });

    console.log(dbdata);

    var dataCount = Object.keys(dbdata).length;
    google.charts.load('current', {'packages':['table']});
    google.charts.setOnLoadCallback(drawTable);

    function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Major');
        data.addColumn('string', 'College');
        
        for(index in dbdata) {

            mainObject = dbdata[index].split(",");

            majorObject = mainObject[1].split(":");
            major = majorObject[1];

            collegeObject = mainObject[2].split(":");
            college = collegeObject[1].split("}")[0];

            data.addRow([major, college]);
        }

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
      }

