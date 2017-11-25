$(function(){
	$('#masterlist').click(function(){

		$('#mlist').show();
		$('#mlisttable').hide();

	});

	$('#event').click(function(){

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

function rowmlist(clearanceStat, contactnum, fname, idnum, liability, lname, mname, yearLevel)
{

	return '<tr class="table-success">'+
			'<td>'+idnum+'</td>'+
			'<td>'+fname+'</td>'+
			'<td>'+mname+'</td>'+
			'<td>'+lname+'</td>'+
			'<td>'+yearLevel+'</td>'+
			'<td>'+contactnum+'</td>'+
			'<td>'+liability+'</td>'+
			'<td>'+clearanceStat+'</td>'+
			'<td> <a title="Edit" data-toggle="tooltip" data-placement="top"><button class="btn btn-primary btn-xs" data-target="#edit" data-toggle="modal" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button> </a><a title="Delete" data-toggle="tooltip" data-placement="top"><button class="btn btn-danger btn-xs" data-target="#delete" data-toggle="modal" data-title="Delete"> <span class="glyphicon glyphicon-trash"></span></button> </a></td>' +
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
			'<td> <a title="Edit" data-toggle="tooltip" data-placement="top"><button class="btn btn-primary btn-xs" data-target="#edit" data-toggle="modal" data-title="Edit"><span class="glyphicon glyphicon-pencil"></span></button> </a><a title="Delete" data-toggle="tooltip" data-placement="top"><button class="btn btn-danger btn-xs" data-target="#delete" data-toggle="modal" data-title="Delete"> <span class="glyphicon glyphicon-trash"></span></button> </a></td>' +
			'</tr>';

}

