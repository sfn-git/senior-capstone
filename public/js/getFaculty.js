google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

function drawTable() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Email');
    data.addColumn('string', 'Position');
    data.addColumn('string', 'Department');
    data.addColumn('string', 'College');
    data.addColumn('string', 'Office');
    data.addColumn('string', 'Phone');
    
    for(index in facultyData) {

        data.addRow([facultyData[index].facultyName, facultyData[index].email, facultyData[index].position, facultyData[index].department, facultyData[index].college, facultyData[index].officeLocation, facultyData[index].officePhone]);

    }

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
  }