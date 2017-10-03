-- *** PROJECT DATABASE *** --
-- By: Nicole Raine S. Cabasa --


------------------------------------------------------------------------------------------------------------------------
-- Table for student
create table student(
  idnum int8 primary key,
  fname text,
  mname text,
  lname text,
  course text,
  yearLevel int2,
  contactnum int,
  standing text,
  clearanceStat text
);

-- Add new student
create or replace function newStudent(par_idnum int8, par_fname text, par_mname text, par_lname text, par_course text, par_yearLevel int2, par_contactnum int, par_standing text, par_clearanceStat text) returns text AS
$$
  DECLARE
    loc_idnum text;
    loc_res text;

  BEGIN
    select into loc_idnum idnum from student where idnum = par_idnum;
    if loc_idnum isnull THEN
      insert into student(idnum, fname, mname, lname, course, yearLevel, contactnum, standing, clearanceStat) values (par_idnum, par_fname, par_mname, par_lname, par_course, par_yearLevel, par_contactnum, par_standing, par_clearanceStat);
      loc_res = 'Student Added';

    ELSE
      loc_res = 'Student Exists';

    END IF;
    return loc_res;

  END;
$$
  language 'plpgsql';

-- view student details
create or replace function viewStudent() returns setof record AS
$$

$$
  language 'sql';

-- View list of students
create or replace function viewStudentlist(out int8, out text, out text, out text, out text, out int2, out int, out text, out text) returns setof record as
$$
  select idnum, fname, mname, lname, course, yearLevel, contactnum, standing, clearanceStat from student;
$$
  language 'sql';

-- Update student details
create or replace function updateStudent(in par_idnum int8, par_yearLevel text, par_contactnum text, par_standing text, par_clearanceStat text) returns text as
$$
  DECLARE
    loc_idnum text;
    loc_res text;
  BEGIN
    select into loc_idnum idnum from student where idnum = par_idnum;
    if loc_idnum isnull then
      loc_res = 'Data not found';
    ELSE

      update student set yearLevel = par_yearLevel, contactnum = par_contactnum, standing = par_standing, clearanceStat = par_clearanceStat where idnum = par_idnum;
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';

-- Delete student
create or replace function delStudent(par_idnum int8) returns text as
$$
  DECLARE
    loc_idnum text;
    loc_res text;
  BEGIN
    select into loc_idnum idnum from student where idnum = par_idnum;
    if loc_idnum isnull THEN
      loc_res = 'Student not in the list';
    ELSE
      delete from student where idnum = par_idnum;
        loc_res = 'Data deleted';
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';


------------------------------------------------------------------------------------------------------------------------
-- Table for Liability
create table liability(
  liabilityNo int primary key,
  idnum int8,
  dateAdded text,
  deadline text,
  particular text,
  amount text,
  FOREIGN KEY (idnum) REFERENCES student(idnum) ON DELETE CASCADE ON UPDATE CASCADE
);

-- View liability

-- Add new liability
create or replace function newLiability(par_liabilityNo text, par_idnum int8, par_dateAdded text, par_deadline text, par_particular text, par_amount text) returns text AS
$$
  DECLARE
    loc_liabilityNo text;
    loc_res text;

  BEGIN
    select into loc_liabilityNo liabilityNo from liability where liabilityNo = par_liabilityNo;
    if loc_liabilityNo isnull THEN
      insert into liability(liabilityNo, idnum, dateAdded, deadline, particular, amount) values (par_liabilityNo, par_idnum, par_dateAdded, par_deadline, par_particular, par_amount);
      loc_res = 'Liability Added';

    ELSE
      loc_res = 'Liability Exists';

    END IF;
    return loc_res;

  END;
$$
  language 'plpgsql';

-- ***Update liability
create or replace function updateLiability(in par_liabilityNo int8, par_yearLevel text, par_contactnum text, par_standing text, par_clearanceStat text) returns text as
$$
  DECLARE
    loc_idnum text;
    loc_res text;
  BEGIN
    select into loc_idnum idnum from student where idnum = par_idnum;
    if loc_idnum isnull then
      loc_res = 'Data not found';
    ELSE

      update student set yearLevel = par_yearLevel, contactnum = par_contactnum, standing = par_standing, clearanceStat = par_clearanceStat where idnum = par_idnum;
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';

-- Delete liability
create or replace function delLiability(par_liabilityNo int8) returns text as
$$
  DECLARE
    loc_liabilityNo text;
    loc_res text;
  BEGIN
    select into loc_liabilityNo liabilityNo from liability where liabilityNo = par_liabilityNo;
    if loc_liabilityNo isnull THEN
      loc_res = 'Liability does not exist';
    ELSE
      delete from liability where liabilityNo = par_liabilityNo;
        loc_res = 'Liability deleted';
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';



------------------------------------------------------------------------------------------------------------------------
-- Table for Event
create table event(
  eventNo int primary key,
  eventName text,
  eventDate text,
  eventDesc text
);

-- Add new event
create or replace function newEvent(par_eventNo int, par_eventName text, par_eventDate text, par_eventDesc text) returns text AS
$$
  DECLARE
    loc_eventNo text;
    loc_res text;

  BEGIN
    select into loc_eventNo eventNo from event where eventNo = par_eventNo;
    if loc_eventNo isnull THEN
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
create or replace function viewEventlist(out int, out text, out text, out text) returns setof record as
$$
  select eventNo, eventName, eventDate, eventDesc from event;
$$
  language 'sql';

-- Update event
create or replace function updateEvent(in par_eventNo int, par_eventName text, par_eventDate text, par_eventDesc text) returns text as
$$
  DECLARE
    loc_eventNo text;
    loc_res text;
  BEGIN
    select into loc_eventNo eventNo from event where eventNo = par_eventNo;
    if loc_eventNo isnull then
      loc_res = 'Data not found';
    ELSE

      update event set eventName = par_eventName, eventDate = par_eventDate, eventDesc = par_eventDesc where eventNo = par_eventNo;
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';


-- Delete event
create or replace function delEvent(par_eventNo int) returns text as
$$
  DECLARE
    loc_eventNo text;
    loc_res text;
  BEGIN
    select into loc_eventNo eventNo from event where eventNo = par_eventNo;
    if loc_eventNo isnull THEN
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
  meetingNo int primary key,
  meetingName text,
  meetingDate text,
  meetingDesc text
);

-- Add new meeting
create or replace function newMeeting(par_meetingNo int, par_meetingName text, par_meetingDate text, par_meetingDesc text) returns text AS
$$
  DECLARE
    loc_meetingNo text;
    loc_res text;

  BEGIN
    select into loc_meetingNo meetingNo from meeting where meetingNo = par_meetingNo;
    if loc_meetingNo isnull THEN
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
create or replace function viewMeetinglist(out int, out text, out text, out text) returns setof record as
$$
  select meetingNo, meetingName, meetingDate, meetingDesc from meeting;
$$
  language 'sql';

-- Update meeting
create or replace function updateMeeting(in par_meetingNo int, par_meetingName text, par_meetingDate text, par_meetingDesc text) returns text as
$$
  DECLARE
    loc_meetingNo text;
    loc_res text;
  BEGIN
    select into loc_meetingNo meetingNo from meeting where meetingNo = par_meetingNo;
    if loc_meetingNo isnull then
      loc_res = 'Meeting not found';
    ELSE

      update meeting set meetingName = par_meetingName, meetingDate = par_meetingDate, meetingDesc = par_meetingDesc where meetingNo = par_meetingNo;
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';


-- Delete meeting
create or replace function delMeeting(par_meetingNo int) returns text as
$$
  DECLARE
    loc_meetingNo text;
    loc_res text;
  BEGIN
    select into loc_meetingNo meetingNo from meeting where meetingNo = par_meetingNo;
    if loc_meetingNo isnull THEN
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
  transNo int primary key,
  transDate text,
  ornumber int,
  amount text,
  particular text
);

-- Add new society transaction
create or replace function newSocietyTrans(par_transNo int, par_transDate text, par_ornumber int, par_amount text, par_particular text) returns text AS
$$
  DECLARE
    loc_transNo text;
    loc_res text;

  BEGIN
    select into loc_transNo transNo from societyTrans where transNo = par_transNo;
    if loc_transNo isnull THEN
      insert into societyTrans(transNo, transDate, ornumber, amount, particular) values (par_transNo, par_transDate, par_ornumber, par_amount, par_particular);
      loc_res = 'Transaction Added';

    ELSE
      loc_res = 'Transaction Already Exists';

    END IF;
    return loc_res;

  END;
$$
  language 'plpgsql';

-- View list of transactions
create or replace function viewTranslist(out int, out text, out int, out text, out text) returns setof record as
$$
  select transNo, transDate, ornumber, amount, particular from societyTrans;
$$
  language 'sql';

-- Update society transactions
create or replace function updateTrans(in par_transNo int, par_transDate text, par_ornumber int, par_amount text, par_particular text) returns text as
$$
  DECLARE
    loc_transNo text;
    loc_res text;
  BEGIN
    select into loc_transNo transNo from societyTrans where transNo = par_transNo;
    if loc_transNo isnull then
      loc_res = 'Society Transaction not found';
    ELSE

      update societyTrans set transNo = par_transNo, transDate = par_transDate, ornumber = par_ornumber, amount = par_amount, particular = par_particular where transNo = par_transNo;
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';


-- Delete transactions
create or replace function delTrans(par_transNo int) returns text as
$$
  DECLARE
    loc_transNo text;
    loc_res text;
  BEGIN
    select into loc_transNo transNo from societyTrans where transNo = par_transNo;
    if loc_transNo isnull THEN
      loc_res = 'Transaction does not exist';
    ELSE
      delete from societyTrans where transNo = par_transNo;
        loc_res = 'Transaction deleted';
    END IF;
      return loc_res;
  END;
$$
  language 'plpgsql';


