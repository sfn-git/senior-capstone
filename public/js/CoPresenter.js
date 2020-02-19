var x=1;

			function addHeader()
			{
				var BH = document.getElementById("BlankHeader");
				BH.innerHTML += "<h id='CoPresHead"+x+"'></h>";
			}

            function AddCoPres()
            {
			    addHeader();
                
                if (x==31)
            	{
            		var Plus30 = document.getElementById("CoPresHead" + x);
            		Plus30.innerHTML += "Please contact ORSP to add more then 30 co-presenters <br>";
                    //incriment so that it goes to next else if and does not reprint Plus30 message
                    x++;
            	}
                else if (x>31)
                { 
                    //print and do nothing after Plus30 
                }
                else
            	{
                    var CoPresForm = document.getElementById("CoPresHead" + x);
                    CoPresForm.innerHTML += "<div id=DivForCP" + x + ">"+
                    //delete after decision is made on morder 
                    "<hr class='CPdivider'>" +
                    "<h5>Co-Presenter " + x + "</h5>" +
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
                    //incriment counter for BlankHeader
                    x++;
                }

                if (x>=2)
	            {
                    // var m = document.getElementById("Delete");???????? might not need
                    $('#Delete').removeAttr('hidden');
                }
                // console.log('inadd ' + x); ???????? might not need
            }
            
            function DeleteCoPres()
            {
				x--;
					
                var RemLastCPform = document.getElementById("DivForCP" + x);
                RemLastCPform.remove();

                if(x<=1)
                {
                    $('#Delete').attr('hidden', 'true');
                }

                // console.log('delete ' + x); ???????? might not need
            }