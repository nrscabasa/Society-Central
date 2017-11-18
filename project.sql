-- *** PROJECT DATABASE *** --
-- By: Nicole Raine S. Cabasa --


------------------------------------------------------------------------------------------------------------------------
-- Table for admin
create table admin (
    username text primary key,
    password text
);

-- Add new admin
create or replace function newadmin(par_un text, par_pw text) returns text as
	$$

		declare
			loc_id text;
			loc_res text;


		begin

			select into loc_id username from admin where username = par_un;
			if loc_id isnull then
				insert into admin(username, password) values (par_un, par_pw);

				loc_res = 'OK';

			else
				loc_res ='Data exists';

			end if;
				return loc_res;

		end;
	$$
	language 'plpgsql'
	-- select newadmin('Adm1', 'Admin123');

-- Access checking for admin
create or replace function checkaccess(par_un text, par_pw text) returns text as
	$$

		declare
			loc_id text;
			loc_res text;

		begin
			select into loc_id username from admin where username = par_un and password = par_pw;

			if loc_id is null then
				loc_res = 'Unauthorized';

			else
				loc_res = 'Granted';

			end if;
				return loc_res;
		end;
	$$

	language 'plpgsql';

---------------------------------------------------------------------------------------------------------------

-- Table for student
create table student(
  idnum text primary key,
  fname text not null,
  mname text not null,
  lname text not null,
  yearLevel int2,
  contactnum text,
  liability text,
  clearanceStat text not null
);

-- Add new student
create or replace function newStudent(par_idnum text, par_fname text, par_mname text, par_lname text, par_yearLevel int2, par_contactnum text, par_liability text,  par_clearanceStat text) returns text AS
$$
  DECLARE
    loc_id text;
    loc_res text;

  BEGIN
    select into loc_id idnum from student where idnum = par_idnum;
    if loc_id isnull THEN
      insert into student(idnum, fname, mname, lname, yearLevel, contactnum, liability, clearanceStat) values (par_idnum, par_fname, par_mname, par_lname, par_yearLevel, par_contactnum, par_liability, par_clearanceStat);
      loc_res = 'Student Added';

    ELSE
      loc_res = 'Student Exists';

    END IF;
    return loc_res;

  END;
$$
  language 'plpgsql';
  -- select newStudent('2013-1633', 'Nicole Raine', 'Segovia', 'Cabasa', '5', '09263176063', 'AF: Paid', 'Cleared');


-- View student details/Search
create or replace function viewStudent(in par_data text, out text, out text, out text, out text, out int2, out text, out text, out text) returns setof record AS
$$
    select idnum, fname, mname, lname, yearLevel, contactnum, liability, clearanceStat from student where idnum = par_data or fname = par_data or mname = par_data or lname = par_data;
$$
  language 'sql';
  -- select viewStudent('2013-1633')

-- View list of students
create or replace function viewStudentlist(out text, out text, out text, out text, out int2, out text, out text, out text) returns setof record as
$$
  select idnum, fname, mname, lname, yearLevel, contactnum, liability, clearanceStat from student;
$$
  language 'sql';

-- Update student details
create or replace function updateStudent(in par_idnum text, par_yearLevel int2, par_contactnum text, par_liability text, par_clearanceStat text) returns text as
$$
  DECLARE
    loc_id text;
    loc_res text;
  BEGIN
    select into loc_id idnum from student where idnum = par_idnum;
    if loc_id isnull then
      loc_res = 'Data not found';
    ELSE
      update student set yearLevel = par_yearLevel, contactnum = par_contactnum, liability = par_liability, clearanceStat = par_clearanceStat where idnum = par_idnum;
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';

-- Delete student
create or replace function delStudent(par_idnum text) returns text as
$$
  DECLARE
    loc_id text;
    loc_res text;
  BEGIN
    select into loc_id idnum from student where idnum = par_idnum;
    if loc_id isnull THEN
      loc_res = 'Student not in the list';
    ELSE
      delete from student where idnum = par_idnum;
        loc_res = 'Student deleted';
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';


------------------------------------------------------------------------------------------------------------------------
-- Table for Event
create table event(
  eventNo text primary key,
  eventName text not null,
  eventDate text,
  eventDesc text
);

-- Add new event
create or replace function newEvent(par_eventNo text, par_eventName text, par_eventDate text, par_eventDesc text) returns text AS
$$
  DECLARE
    loc_id text;
    loc_res text;

  BEGIN
    select into loc_id eventNo from event where eventNo = par_eventNo;
    if loc_id isnull THEN
      insert into event(eventNo, eventName, eventDate, eventDesc) values (par_eventNo, par_eventName, par_eventDate, par_eventDesc);
      loc_res = 'Event Added';

    ELSE
      loc_res = 'Event Exists';

    END IF;
    return loc_res;

  END;
$$
  language 'plpgsql';

-- View list of events
create or replace function viewEventlist(out text, out text, out text, out text) returns setof record as
$$
  select eventNo, eventName, eventDate, eventDesc from event;
$$
  language 'sql';

-- View event details/Search
create or replace function viewEvent(in par_data text, out text, out text, out text, out text) returns setof record AS
$$
    select eventNo, eventName, eventDate, eventDesc from event where eventNo = par_data or eventName = par_data;
$$
  language 'sql';

-- Update event
create or replace function updateEvent(in par_eventNo text, par_eventName text, par_eventDate text, par_eventDesc text) returns text as
$$
  DECLARE
    loc_id text;
    loc_res text;
  BEGIN
    select into loc_id eventNo from event where eventNo = par_eventNo;
    if loc_id isnull then
      loc_res = 'Data not found';
    ELSE

      update event set eventName = par_eventName, eventDate = par_eventDate, eventDesc = par_eventDesc where eventNo = par_eventNo;
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';


-- Delete event
create or replace function delEvent(par_eventNo text) returns text as
$$
  DECLARE
    loc_id text;
    loc_res text;
  BEGIN
    select into loc_id eventNo from event where eventNo = par_eventNo;
    if loc_id isnull THEN
      loc_res = 'Event does not exist';
    ELSE
      delete from event where eventNo = par_eventNo;
        loc_res = 'Event deleted';
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';



------------------------------------------------------------------------------------------------------------------------
-- Table for Meeting
create table meeting(
  meetingNo text primary key,
  meetingName text not null,
  meetingDate text,
  meetingDesc text
);

-- Add new meeting
create or replace function newMeeting(par_meetingNo text, par_meetingName text, par_meetingDate text, par_meetingDesc text) returns text AS
$$
  DECLARE
    loc_id text;
    loc_res text;

  BEGIN
    select into loc_id meetingNo from meeting where meetingNo = par_meetingNo;
    if loc_id isnull THEN
      insert into meeting(meetingNo, meetingName, meetingDate, meetingDesc) values (par_meetingNo, par_meetingName, par_meetingDate, par_meetingDesc);
      loc_res = 'Meeting Added';

    ELSE
      loc_res = 'Meeting Exists';

    END IF;
    return loc_res;

  END;
$$
  language 'plpgsql';

-- View list of meetings
create or replace function viewMeetinglist(out text, out text, out text, out text) returns setof record as
$$
  select meetingNo, meetingName, meetingDate, meetingDesc from meeting;
$$
  language 'sql';

-- View meeting details/Search
create or replace function viewMeeting(in par_data text, out text, out text, out text, out text) returns setof record AS
$$
    select meetingNo, meetingName, meetingDate, meetingDesc from meeting where meetingNo = par_data or meetingName = par_data;
$$
  language 'sql';

-- Update meeting
create or replace function updateMeeting(in par_meetingNo text, par_meetingName text, par_meetingDate text, par_meetingDesc text) returns text as
$$
  DECLARE
    loc_id text;
    loc_res text;
  BEGIN
    select into loc_id meetingNo from meeting where meetingNo = par_meetingNo;
    if loc_id isnull then
      loc_res = 'Meeting not found';
    ELSE

      update meeting set meetingName = par_meetingName, meetingDate = par_meetingDate, meetingDesc = par_meetingDesc where meetingNo = par_meetingNo;
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';


-- Delete meeting
create or replace function delMeeting(par_meetingNo text) returns text as
$$
  DECLARE
    loc_id text;
    loc_res text;
  BEGIN
    select into loc_id meetingNo from meeting where meetingNo = par_meetingNo;
    if loc_id isnull THEN
      loc_res = 'Meeting does not exist';
    ELSE
      delete from meeting where meetingNo = par_meetingNo;
        loc_res = 'Meeting deleted';
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';

------------------------------------------------------------------------------------------------------------------------
-- Table for SocietyTransaction
create table societyTrans(
  transNo text primary key,
  transDate text,
  deadline text,
  ornumber text,
  amount text,
  particular text
);

-- Add new society transaction
create or replace function newSocietyTrans(par_transNo text, par_transDate text, par_deadline text, par_ornumber text, par_amount text, par_particular text) returns text AS
$$
  DECLARE
    loc_id text;
    loc_res text;

  BEGIN
    select into loc_id transNo from societyTrans where transNo = par_transNo;
    if loc_id isnull THEN
      insert into societyTrans(transNo, transDate, deadline, ornumber, amount, particular) values (par_transNo, par_transDate, par_deadline, par_ornumber, par_amount, par_particular);
      loc_res = 'Transaction Added';

    ELSE
      loc_res = 'Transaction Already Exists';

    END IF;
    return loc_res;

  END;
$$
  language 'plpgsql';

-- View list of transactions
create or replace function viewTranslist(out text, out text, out text, out text, out text, out text) returns setof record as
$$
  select transNo, transDate, deadline, ornumber, amount, particular from societyTrans;
$$
  language 'sql';

-- View transaction details/Search
create or replace function viewTrans(in par_data text, out text, out text, out text, out text, out text, out text) returns setof record AS
$$
    select transNo, transDate, deadline, ornumber, amount, particular from societyTrans where transNo = par_data or particular = par_data;
$$
  language 'sql';

-- Update society transactions
create or replace function updateTrans(in par_transNo int, par_transDate text, par_deadline text, par_ornumber text, par_amount text, par_particular text) returns text as
$$
  DECLARE
    loc_id text;
    loc_res text;
  BEGIN
    select into loc_id transNo from societyTrans where transNo = par_transNo;
    if loc_id isnull then
      loc_res = 'Society Transaction not found';
    ELSE

      update societyTrans set transNo = par_transNo, transDate = par_transDate, deadline = par_deadline, ornumber = par_ornumber, amount = par_amount, particular = par_particular where transNo = par_transNo;
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';


-- Delete transactions
create or replace function delTrans(par_transNo int) returns text as
$$
  DECLARE
    loc_id text;
    loc_res text;
  BEGIN
    select into loc_id transNo from societyTrans where transNo = par_transNo;
    if loc_id isnull THEN
      loc_res = 'Transaction does not exist';
    ELSE
      delete from societyTrans where transNo = par_transNo;
        loc_res = 'Transaction deleted';
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';


