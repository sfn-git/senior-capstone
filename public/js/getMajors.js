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

    var dbdata = "{{major}}";
    console.log(dbdata);

    var dataCount = Object.keys(dbdata).length;
    google.charts.load('current', {'packages':['table']});
    google.charts.setOnLoadCallback(drawTable);

    function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Major');
        data.addColumn('string', 'College');
        
        for(var i=0; i<dataCount; i++) {
            data.addRow([dbdata[i].major, dbdata[i].college])
        }

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
      }

