$(function(){
	$('#masterlist').click(function(){

		$('#mlist').show();
		$('#mlisttable').hide();
		$('#searchedml').hide();

	});


	$('#event').click(function(){

        $('#elist').show();
		$('#elisttable').hide();
		$('#searchedel').hide();

	});

	$('#meeting').click(function(){

		$('#metlist').show();
		$('#metlisttable').hide();
		$('#searchedmet').hide();

	});

	$('#transaction').click(function(){

		$('#sttlist').show();
		$('#stlisttable').hide();
		$('#searchedst').hide();

	});

});

var data;
var data2;
var data3;
var data4;

///////////////////////////////////////////////////// M A S T E R  L I S T ////////////////////////////////////////////////
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
                    document.getElementById('mldata').value="";

				}
			}
			else{
				$('#mlisttable').html("");
                alert(resp.message);
			}
		},
		error: function(err)
		{
			alert("Table is empty");
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

			alert("Data not found");
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




///////////////////////////////////////////////////// E V E N T S ////////////////////////////////////////////////
function rowelist(eventDate, eventDesc, eventName, eventNo)
{

	return '<tr class="table-success" onclick="clickdata2(this)">'+
			'<td>'+eventNo+'</td>'+
			'<td>'+eventName+'</td>'+
			'<td>'+eventDate+'</td>'+
			'<td>'+eventDesc+'</td>'+
			'<td> <a title="Edit" data-toggle="tooltip" data-placement="top"><button class="btn btn-primary btn-xs" data-target="#edit" data-toggle="modal" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>' +
			'</a><a title="Delete" data-toggle="tooltip" data-placement="top"><button class="btn btn-danger btn-xs" data-target="#delete" data-toggle="modal" data-title="Delete"> <span class="glyphicon glyphicon-trash"></span></button> </a></td>' +
			'</tr>';

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
                    $('#searchedel').hide();
                    $('#viewselist').hide();
                    document.getElementById('eldata').value="";

				}
			}
			else{
				$('elisttable').html("");
                alert(resp.message);
			}
		},
		error: function(err)
		{
			alert("Error");
		}
	});
}

function searchelist(){

	var data =$('#eldata').val();
	$.ajax({
		url: 'http://127.0.0.1:5000/eventdata/'+data,
		type: "GET",
		dataType: "json",
		success: function(resp)
		{
			$("#searchedel").html("");

			if(resp.status == 'ok'){
				for(i=0; i<resp.count; i++)
				{
					eventDate = resp.entries[i].eventDate;
					eventDesc = resp.entries[i].eventDesc;
					eventName = resp.entries[i].eventName;
					eventNo = resp.entries[i].eventNo;

					$("#searchedel").append(rowelist(eventDate, eventDesc, eventName, eventNo));
					$('#viewselist').show();
					$('#elisttable').hide();
					//$('#sevents').hide();
					$('#searchedel').show();
					//$('#viewselist').show();

				}

			}
			else{
				$("#searchedel").html("");
				alert(resp.message);
			}

		},
		error: function(err)
		{

			alert("Data not found");
		}


	});
}

function addevent(){
	$.ajax({
		data:{
			eNo: $('#eNo').val(),
			eName:$('#eName').val(),
			eDate:$('#eDate').val(),
			eDesc:$('#eDesc').val(),

		},
		url:'http://127.0.0.1:5000/event',
		type: "POST",
		dataType:"json",
		success:function(resp)
		{
		    //alert(resp.message);
		    updateae();
			showeventlist();

		},
		error: function(err)
		{
			alert("Error in the system occurred");
		}

	});
}

function updateae(){
    document.getElementById('eNo').value="";
    document.getElementById('eName').value="";
    document.getElementById('eDate').value="";
    document.getElementById('eDesc').value="";

}


//Data per row in EVENT LIST TABLE
function clickdata2(b) {

    var n = b.rowIndex;
    n = n-1;
    data2 = document.getElementById("sevents").rows[n].cells[0].innerHTML;
    document.getElementById('evtNo').value = data2;
    //alert(data2);

}

function editevent() {

    $.ajax({
		data:{
			evtNo: $('#evtNo').val(),
			evtName:$('#evtName').val(),
			evtDate:$('#evtDate').val(),
			evtDesc:$('#evtDesc').val(),

		},
		url:'http://127.0.0.1:5000/evt',
		type: "POST",
		dataType:"json",
		success:function(resp)
		{
		    //alert("Updated");
		    updateee();
			showeventlist();

		},
		error: function(err)
		{
			alert("Error in the system occurred");
		}

	});

}

function updateee(){
    document.getElementById('evtNo').value="";
    document.getElementById('evtName').value="";
    document.getElementById('evtDate').value="";
    document.getElementById('evtDesc').value="";

}

function deleteevent() {


    $.ajax({
		url: 'http://127.0.0.1:5000/evt/'+data2,
		type: "GET",
		dataType: "json",
		success: function(resp)
		{
			if(resp.status == 'ok'){

				showeventlist();

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


///////////////////////////////////////////////////// M E E T I N G S ////////////////////////////////////////////////
function rowmetlist(meetingDate, meetingDesc, meetingName, meetingNo)
{

	return '<tr class="table-success" onclick="clickdata3(this)">'+
			'<td>'+meetingNo+'</td>'+
			'<td>'+meetingName+'</td>'+
			'<td>'+meetingDate+'</td>'+
			'<td>'+meetingDesc+'</td>'+
			'<td> <a title="Edit" data-toggle="tooltip" data-placement="top"><button class="btn btn-primary btn-xs" data-target="#edit" data-toggle="modal" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>' +
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
					$('#metlist').show();
                    $('#metlisttable').show();
                    //$('#searchedmet').hide();
                    $('#viewsmetlist').hide();
                    document.getElementById('metdata').value="";

				}
			}
			else{
				$('metlisttable').html("");
                alert(resp.message);
			}
		},
		error: function(err)
		{
			alert("Error");
		}
	});
}

function searchmetlist(){

	var data= $('#metdata').val();
	$.ajax({
		url: 'http://127.0.0.1:5000/meetingdetails/'+data,
		type: "GET",
		dataType: "json",
		success: function(resp)
		{
			$("#searchedmet").html("");

			if(resp.status == 'ok'){
				for(i=0; i<resp.count; i++)
				{
					meetingDate = resp.entries[i].meetingDate;
					meetingDesc = resp.entries[i].meetingDesc;
					meetingName = resp.entries[i].meetingName;
					meetingNo = resp.entries[i].meetingNo;

					$("#searchedmet").append(rowmetlist(meetingDate, meetingDesc, meetingName, meetingNo));
					$('#viewsmetlist').show();
					$('#metlisttable').hide();
					//$('#sevents').hide();
					$('#searchedel').show();
					//$('#viewselist').show();

				}

			}
			else{
				$("#searchedmet").html("");
				alert(resp.message);
			}

		},
		error: function(err)
		{

			alert("Data not found");
		}


	});
}

function addmeeting(){
	$.ajax({
		data:{
			mNo: $('#mNo').val(),
			mName:$('#mName').val(),
			mDate:$('#mDate').val(),
			mDesc:$('#mDesc').val(),

		},
		url:'http://127.0.0.1:5000/meeting',
		type: "POST",
		dataType:"json",
		success:function(resp)
		{
		    //alert(resp.message);
		    updateam();
			showmeetinglist();

		},
		error: function(err)
		{
			alert("Error in the system occurred");
		}

	});
}

function updateam(){
    document.getElementById('mNo').value="";
    document.getElementById('mName').value="";
    document.getElementById('mDate').value="";
    document.getElementById('mDesc').value="";

}

//Data per row in MEETING LIST TABLE
function clickdata3(c) {

    var n = c.rowIndex;
    n = n-1;
    data3 = document.getElementById("smeetings").rows[n].cells[0].innerHTML;
    document.getElementById('metNo').value = data3;
    //alert(data3);

}

function editmeeting() {

    $.ajax({
		data:{
			metNo: $('#metNo').val(),
			metName:$('#metName').val(),
			metDate:$('#metDate').val(),
			metDesc:$('#metDesc').val(),

		},
		url:'http://127.0.0.1:5000/mtng',
		type: "POST",
		dataType:"json",
		success:function(resp)
		{
		    //alert("Updated");
		    updateem();
			showmeetinglist();


		},
		error: function(err)
		{
			alert("Error in the system occurred");
		}

	});

}

function updateem(){
    document.getElementById('metNo').value="";
    document.getElementById('metName').value="";
    document.getElementById('metDate').value="";
    document.getElementById('metDesc').value="";

}

function deletemeeting() {


    $.ajax({
		url: 'http://127.0.0.1:5000/mtng/'+data3,
		type: "GET",
		dataType: "json",
		success: function(resp)
		{
			if(resp.status == 'ok'){

				showmeetinglist();

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




///////////////////////////////////////////////////// S O C I E T Y  T R A N S A C T I O N S ////////////////////////////////////////////////
function rowstlist(amount, deadline, ornumber, particular, transDate, transNo)
{

	return '<tr class="table-success" onclick="clickdata4(this)">'+
			'<td>'+transNo+'</td>'+
			'<td>'+transDate+'</td>'+
			'<td>'+deadline+'</td>'+
			'<td>'+ornumber+'</td>'+
			'<td>'+amount+'</td>'+
			'<td>'+particular+'</td>'+
			'<td> <a title="Edit" data-toggle="tooltip" data-placement="top"><button class="btn btn-primary btn-xs" data-target="#edit" data-toggle="modal" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>' +
			'</a><a title="Delete" data-toggle="tooltip" data-placement="top"><button class="btn btn-danger btn-xs" data-target="#delete" data-toggle="modal" data-title="Delete"> <span class="glyphicon glyphicon-trash"></span></button> </a></td>' +
			'</tr>';

}

function showsoctlist(){

	$.ajax({
		url: 'http://127.0.0.1:5000/transactions',
		type: "GET",
		dataType: "json",
		success: function(resp)
		{
			$('#ssoctrans').html("");
			if(resp.status == 'ok'){
				for(i=0;  i<resp.count; i++)
				{
					amount = resp.entries[i].amount;
					deadline = resp.entries[i].deadline;
					ornumber = resp.entries[i].ornumber;
					particular = resp.entries[i].particular;
					transDate = resp.entries[i].transDate;
					transNo = resp.entries[i].transNo;


					$('#ssoctrans').append(rowstlist(amount, deadline, ornumber, particular, transDate, transNo));
					$('#stlist').show();
                    $('#stlisttable').show();
                    $('#searchedst').hide();
                    $('#viewsstlist').hide();
                    document.getElementById('stdata').value="";

				}
			}
			else{
				$('stlisttable').html("");
                alert(resp.message);
			}
		},
		error: function(err)
		{
			alert("Error");
		}
	});
}

function searchstlist(){

	var data =$('#stdata').val();
	$.ajax({
		url: 'http://127.0.0.1:5000/transactiondetails/'+data,
		type: "GET",
		dataType: "json",
		success: function(resp)
		{
			$("#searchedst").html("");

			if(resp.status == 'ok'){
				for(i=0; i<resp.count; i++)
				{
					amount = resp.entries[i].amount;
					deadline = resp.entries[i].deadline;
					ornumber = resp.entries[i].ornumber;
					particular = resp.entries[i].particular;
					transDate = resp.entries[i].transDate;
					transNo = resp.entries[i].transNo;

					$("#searchedst").append(rowstlist(amount, deadline, ornumber, particular, transDate, transNo));
					$('#viewsstlist').show();
					$('#stlisttable').hide();
					//$('#ssoctrans').hide();
					$('#searchedst').show();
					//$('#viewselist').show();

				}

			}
			else{
				$("#searchedst").html("");
				alert(resp.message);
			}

		},
		error: function(err)
		{

			alert("Data not found");
		}


	});
}

function addsoctrans(){

    var stno = $('#tNo').val();
    var stdate = $('#tDate').val();
    var stdeadline = $('#tdeadline').val();
    var storn = $('#torn').val();
    var stpart = $('#tpart').val();
    var stamt = $('#tamt').val();

    $.ajax({

        url:'http://127.0.0.1:5000/transaction/'+stno+'/'+stdate+'/'+stdeadline+'/'+storn+'/'+stamt+'/'+stpart,
        type: 'GET',
        dataType: 'json',
        success: function(resp){

             updateest();
			 showsoctlist();
        },
        error: function(err)
		{
			alert("Error in the system occurred");
		}
    });

}

function updateast(){
    document.getElementById('tNo').value="";
    document.getElementById('tDate').value="";
    document.getElementById('tdeadline').value="";
    document.getElementById('torn').value="";
    document.getElementById('tamt').value="";
    document.getElementById('tpart').value="";

}

//Data per row in TRANSACTION LIST TABLE
function clickdata4(d) {

    var n = d.rowIndex;
    n = n-1;
    data4 = document.getElementById("ssoctrans").rows[n].cells[0].innerHTML;
    document.getElementById('stNo').value = data4;
    //alert(data4);

}
function editsoctrans(){
    var stno = $('#stNo').val();
    var stdate = $('#stDate').val();
    var stdeadline = $('#stdeadline').val();
    var storn = $('#storn').val();
    var stpart = $('#stpart').val();
    var stamt = $('#stamt').val();

    $.ajax({

        url:'http://127.0.0.1:5000/soctrans/'+stno+'/'+stdate+'/'+stdeadline+'/'+storn+'/'+stamt+'/'+stpart,
        type: 'GET',
        dataType: 'json',
        success: function(resp){

             updateest();
			 showsoctlist();
        },
        error: function(err)
		{
			alert("Error in the system occurred");
		}
    });
}


function updateest(){
    document.getElementById('stNo').value="";
    document.getElementById('stDate').value="";
    document.getElementById('stdeadline').value="";
    document.getElementById('storn').value="";
    document.getElementById('stamt').value="";
    document.getElementById('stpart').value="";

}

function deletesoctrans() {


    $.ajax({
		url: 'http://127.0.0.1:5000/soctrans/'+data4,
		type: "GET",
		dataType: "json",
		success: function(resp)
		{
			if(resp.status == 'ok'){

				showsoctlist();

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