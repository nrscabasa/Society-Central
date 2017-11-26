$(function(){
	$('#masterlist').click(function(){

		$('#mlist').show();
		$('#mlisttable').hide();
		$('#searchedml').hide();

	});


	$('#event').click(function(){

        $('#elist').show();
		$('#elisttable').hide();

		$('#mlist').hide();
		$('#mlisttable').hide();

	});

	$('#meeting').click(function(){

		$('#mlist').hide();
		$('#mlisttable').hide();

	});

	$('#transaction').click(function(){

		$('#mlist').hide();
		$('#mlisttable').hide();

	});

});

var data;
function login(){
	var un=$('#admin').val();
	var pw= $('#password').val();

	$.ajax({
		url:'http:127.0.0.1:5000/access',
		dataType: 'json',
		type:'POST',
		data:
		{
			admin: un,
			password:pw
		},
		success: function(resp){

			if(resp.status == 'Granted'){

				showmasterlist();

			}

			else{


			}
		},
		error: function(err){
			alert("Error");
		}

	});
}


function rowmlist(clearanceStat, contactnum, fname, idnum, liability, lname, mname, yearLevel)
{

	return '<tr class="table-success" onclick="clickdata(this)">'+
			'<td>'+idnum+'</td>'+
			'<td>'+fname+'</td>'+
			'<td>'+mname+'</td>'+
			'<td>'+lname+'</td>'+
			'<td>'+yearLevel+'</td>'+
			'<td>'+contactnum+'</td>'+
			'<td>'+liability+'</td>'+
			'<td>'+clearanceStat+'</td>'+
			'<td> <a title="Edit" data-toggle="tooltip" data-placement="top"><button class="btn btn-primary btn-xs" data-target="#edit" data-toggle="modal" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>' +
			'</a><a title="Delete" data-toggle="tooltip" data-placement="top"><button class="btn btn-danger btn-xs" data-target="#delete" data-toggle="modal" data-title="Delete"> <span class="glyphicon glyphicon-trash"></span></button> </a></td>' +
			'</tr>';

}

function showmasterlist(){

	$.ajax({
		url: 'http://127.0.0.1:5000/masterlist',
		type: "GET",
		dataType: "json",
		success: function(resp)
		{
			$('#smasterlist').html("");
			if(resp.status == 'ok'){
				for(i=0;  i<resp.count; i++)
				{
					clearanceStat = resp.entries[i].clearanceStat;
					contactnum = resp.entries[i].contactnum;
					fname = resp.entries[i].fname;
					idnum = resp.entries[i].idnum;
					liability = resp.entries[i].liability;
					lname = resp.entries[i].lname;
					mname = resp.entries[i].mname;
					yearLevel = resp.entries[i].yearLevel;




					$('#smasterlist').append(rowmlist(clearanceStat, contactnum, fname, idnum, liability, lname, mname, yearLevel));
                    $('#mlist').show();
                    $('#mlisttable').show();
                    $('#searchedml').hide();
                    $('#viewsmlist').hide();

				}
			}
			else{
				$('#mlisttable').html("");
                alert(resp.message);
			}
		},
		error: function(err)
		{
			alert("Error");
		}
	});
}

function searchmlist(){

	var data =$('#mldata').val();
	$.ajax({
		url: 'http://127.0.0.1:5000/studentdata/'+data,
		type: "GET",
		dataType: "json",
		success: function(resp)
		{
			$("#searchedml").html("");

			if(resp.status == 'ok'){
				for(i=0; i<resp.count; i++)
				{
					clearanceStat = resp.entries[i].clearanceStat;
					contactnum = resp.entries[i].contactnum;
					fname = resp.entries[i].fname;
					idnum = resp.entries[i].idnum;
					liability = resp.entries[i].liability;
					lname = resp.entries[i].lname;
					mname = resp.entries[i].mname;
					yearLevel = resp.entries[i].yearLevel;

					$("#searchedml").append(rowmlist(clearanceStat, contactnum, fname, idnum, liability, lname, mname, yearLevel));
					$('#viewsmlist').show();
					$('#mlisttable').hide();
					$('#searchedml').show();
					$('#viewsmlist').show();

				}

			}
			else{
				$("#searchedml").html("");
				alert(resp.message);
			}

		},
		error: function(err)
		{

			alert("Error in the system occurred");
		}


	});
}

function addstudent(){
	$.ajax({
		data:{
			id: $('#id').val(),
			studfname:$('#studfname').val(),
			studmname:$('#studmname').val(),
			studlname:$('#studlname').val(),
			yearlev:$('#yearlev').val(),
			cnum:$('#cnum').val(),
			liab:$('#liab').val(),
			clearance:$('#clearance').val(),
		},
		url:'http://127.0.0.1:5000/student',
		type: "POST",
		dataType:"json",
		success:function(resp)
		{
		    //alert(resp.message);
		    updateas();
			showmasterlist();

		},
		error: function(err)
		{
			alert("Error in the system occurred");
		}

	});
}

function updateas(){
    document.getElementById('id').value="";
    document.getElementById('studfname').value="";
    document.getElementById('studmname').value="";
    document.getElementById('studlname').value="";
    document.getElementById('yearlev').value="";
    document.getElementById('cnum').value="";
    document.getElementById('liab').value="";
    document.getElementById('clearance').value="";

}

//Data per row in MASTER LIST TABLE
function clickdata(a) {

    var n = a.rowIndex;
    n = n-1;
    data = document.getElementById("smasterlist").rows[n].cells[0].innerHTML;
    document.getElementById('studid').value = data;

}

function editstudent() {

    $.ajax({
		data:{
			studid: $('#studid').val(),
			studyearlev:$('#studyearlev').val(),
			studcnum:$('#studcnum').val(),
			studliab:$('#studliab').val(),
			studclearance:$('#studclearance').val(),
		},
		url:'http://127.0.0.1:5000/stud',
		type: "POST",
		dataType:"json",
		success:function(resp)
		{
		    //alert("Updated");
		    updatees();
			showmasterlist();

		},
		error: function(err)
		{
			alert("Error in the system occurred");
		}

	});

}

function updatees(){
    document.getElementById('studyearlev').value="";
    document.getElementById('studcnum').value="";
    document.getElementById('studliab').value="";
    document.getElementById('studclearance').value="";

}

function deletestudent() {

    $.ajax({
		url: 'http://127.0.0.1:5000/stud/'+data,
		type: "GET",
		dataType: "json",
		success: function(resp)
		{
			if(resp.status == 'ok'){
			    //location.reload();
				//$("#delete").modal('hide');
				showmasterlist();

			}
			else{

                alert(resp.message);
			}
		},
		error: function(err)
		{
			alert("Error");
		}
	});

}






function showeventlist(){

	$.ajax({
		url: 'http://127.0.0.1:5000/events',
		type: "GET",
		dataType: "json",
		success: function(resp)
		{
			$('#sevents').html("");
			if(resp.status == 'ok'){
				for(i=0;  i<resp.count; i++)
				{
					eventDate = resp.entries[i].eventDate;
					eventDesc = resp.entries[i].eventDesc;
					eventName = resp.entries[i].eventName;
					eventNo = resp.entries[i].eventNo;


					$('#sevents').append(rowelist(eventDate, eventDesc, eventName, eventNo));
					$('#elist').show();
                    $('#elisttable').show();


				}
			}
			else{
				$('').html("");
                alert(resp.message);
			}
		},
		error: function(err)
		{
			alert("Error");
		}
	});
}

function rowelist(eventDate, eventDesc, eventName, eventNo)
{

	return '<tr class="table-success">'+
			'<td>'+eventNo+'</td>'+
			'<td>'+eventName+'</td>'+
			'<td>'+eventDate+'</td>'+
			'<td>'+eventDesc+'</td>'+
			'<td> <a title="Edit" data-toggle="tooltip" data-placement="top"><button onclick= class="btn btn-primary btn-xs" data-target="#edit" data-toggle="modal" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>'+
			'</a><a title="Delete" data-toggle="tooltip" data-placement="top"><button class="btn btn-danger btn-xs" data-target="#delete" data-toggle="modal" data-title="Delete"> <span class="glyphicon glyphicon-trash"></span></button> </a></td>' +
			'</tr>';

}


function showmeetinglist(){

	$.ajax({
		url: 'http://127.0.0.1:5000/meetings',
		type: "GET",
		dataType: "json",
		success: function(resp)
		{
			$('#smeetings').html("");
			if(resp.status == 'ok'){
				for(i=0;  i<resp.count; i++)
				{
					meetingDate = resp.entries[i].meetingDate;
					meetingDesc = resp.entries[i].meetingDesc;
					meetingName = resp.entries[i].meetingName;
					meetingNo = resp.entries[i].meetingNo;


					$('#smeetings').append(rowmetlist(meetingDate, meetingDesc, meetingName, meetingNo));


				}
			}
			else{
				$('').html("");
                alert(resp.message);
			}
		},
		error: function(err)
		{
			alert("Error");
		}
	});
}

function rowmetlist(meetingDate, meetingDesc, meetingName, meetingNo)
{

	return '<tr class="table-success">'+
			'<td>'+meetingNo+'</td>'+
			'<td>'+meetingName+'</td>'+
			'<td>'+meetingDate+'</td>'+
			'<td>'+meetingDesc+'</td>'+
			'<td> <a title="Edit" data-toggle="tooltip" data-placement="top"><button class="btn btn-primary btn-xs" data-target="#edit" data-toggle="modal" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button> </a><a title="Delete" data-toggle="tooltip" data-placement="top"><button class="btn btn-danger btn-xs" data-target="#delete" data-toggle="modal" data-title="Delete"> <span class="glyphicon glyphicon-trash"></span></button> </a></td>' +
			'</tr>';

}


function showsoctlist(){

	$.ajax({
		url: 'http://127.0.0.1:5000/transactions',
		type: "GET",
		dataType: "json",
		success: function(resp)
		{
			$('#ssoctlist').html("");
			if(resp.status == 'ok'){
				for(i=0;  i<resp.count; i++)
				{
					amount = resp.entries[i].amount;
					deadline = resp.entries[i].deadline;
					ornumber = resp.entries[i].ornumber;
					particular = resp.entries[i].particular;
					transDate = resp.entries[i].transDate;
					transNo = resp.entries[i].transNo;

					$('#ssoctlist').append(rowstlist(amount, deadline, ornumber, particular, transDate, transNo));


				}
			}
			else{
				$('').html("");
                alert(resp.message);
			}
		},
		error: function(err)
		{
			alert("Error");
		}
	});
}

function rowstlist(amount, deadline, ornumber, particular, transDate, transNo)
{

	return '<tr class="table-success">'+
			'<td>'+transNo+'</td>'+
			'<td>'+transDate+'</td>'+
			'<td>'+deadline+'</td>'+
			'<td>'+ornumber+'</td>'+
			'<td>'+amount+'</td>'+
			'<td>'+particular+'</td>'+
			'<td> <a title="Edit" data-toggle="tooltip" data-placement="top"><button class="btn btn-primary btn-xs" data-target="#edit" data-toggle="modal" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button> </a><a title="Delete" data-toggle="tooltip" data-placement="top"><button class="btn btn-danger btn-xs" data-target="#delete" data-toggle="modal" data-title="Delete"> <span class="glyphicon glyphicon-trash"></span></button> </a></td>' +
			'</tr>';

}

