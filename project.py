#!flask/bin/python
from flask import Flask, jsonify, request
from flask_httpauth import HTTPBasicAuth
from flask import render_template, redirect, url_for, session, flash
from model import DBconn
import sys, flask, os
import warnings
#from flask.exthook import ExtDeprecationWarning

app = Flask(__name__)
auth = HTTPBasicAuth

def spcall(qry, param, commit=False):
    try:
        dbo = DBconn()
        cursor = dbo.getcursor()
        cursor.callproc(qry, param)
        res = cursor.fetchall()
        if commit:
            dbo.dbcommit()
        return res
    except:
        res = [("Error: " + str(sys.exc_info()[0]) + " " + str(sys.exc_info()[1]),)]
    return res


@app.route('/')
def index():
    return "Hi!"

#Log in
@app.route('/access', methods =['POST'])
def login():
    un = request.form['admin']
    pw =request.form['password']

    res =spcall('checkaccess', (un, pw), True)

    return jsonify({'status': res[0][0]})

#View list of students
@app.route ('/masterlist', methods=['GET'])
def viewStudentlist():
    res = spcall ('viewStudentlist', ())

    if 'Error' in str (res[0][0]):
        return jsonify ({'status': 'error', 'message': res[0][0]})
    recs = []

    for r in res:
        recs.append ({"idnum": r[0], "fname": r[1], "mname": r[2], "lname": r[3], "yearLevel": r[4], "contactnum": r[5], "liability": r[6], "clearanceStat": r[7]})
    return jsonify ({'status': 'ok', 'entries': recs, 'count': len (recs)})

#View/Search Student details
@app.route('/studentdata/<string:data>', methods=['GET'])
def viewStudent(data):
    res =spcall('viewStudent',(data,), True)
    print res
    if 'Error' in str(res[0][0]):
        return jsonify({'status':'error', 'message':res[0][0]})

    recs=[]
    for r in res:
        recs.append ({"idnum": r[0], "fname": r[1], "mname": r[2], "lname": r[3], "yearLevel": r[4], "contactnum": r[5], "liability": r[6], "clearanceStat": r[7]})

    return jsonify({'status':'ok', 'entries':recs, 'count':len(recs)})

#Add new student
@app.route ('/student', methods=['POST'])
def addstudent():
    id = request.form['id']
    studfname = request.form['studfname']
    studmname = request.form['studmname']
    studlname = request.form['studlname']
    yearlev = request.form['yearlev']
    cnum = request.form['cnum']
    liab = request.form['liab']
    clearance = request.form['clearance']

    res = spcall ("newStudent", (id, studfname, studmname, studlname, yearlev, cnum, liab, clearance), True)
    if 'Student Exists' in res[0][0]:
        return jsonify ({'status': 'error', 'message': res[0][0]})

    return jsonify ({'status': 'ok', 'message': res[0][0]})

#Update student
@app.route('/stud', methods=['POST'])
def updatestud():
    studid = request.form['studid']
    studyearlev = request.form['studyearlev']
    studcnum = request.form['studcnum']
    studliab = request.form['studliab']
    studclearance = request.form['studclearance']

    res = spcall ("updateStudent", (studid, studyearlev, studcnum, studliab, studclearance), True)
    if 'Error' in str(res[0][0]):
        return jsonify ({'status': 'error', 'message': res[0][0]})

    return jsonify ({'status': 'ok', 'message': res[0][0]})

#Delete student
@app.route('/stud/<string:data>', methods=['GET'])
def deletestud(data):
    res = spcall ("delStudent", (data,), True)
    if 'Error' in str(res[0][0]):
        return jsonify ({'status': 'error', 'message': res[0][0]})

    return jsonify ({'status': 'ok', 'message': res[0][0]})



#View List of events
@app.route ('/events', methods=['GET'])
def viewEventlist():
    res = spcall ('viewEventlist', ())

    if 'Error' in str (res[0][0]):
        return jsonify ({'status': 'error', 'message': res[0][0]})
    recs = []

    for r in res:
        recs.append ({"eventNo": r[0], "eventName": r[1], "eventDate": r[2], "eventDesc": r[3]})
    return jsonify ({'status': 'ok', 'entries': recs, 'count': len (recs)})

#View/Search Event details
@app.route('/eventdata/<string:data>', methods=['GET'])
def viewEvent(data):
    res =spcall('viewEvent',(data,), True)
    print res
    if 'Error' in str(res[0][0]):
        return jsonify({'status':'error', 'message':res[0][0]})

    recs=[]
    for r in res:
        recs.append ({"eventNo": r[0], "eventName": r[1], "eventDate": r[2], "eventDesc": r[3]})

    return jsonify({'status':'ok', 'entries':recs, 'count':len(recs)})

#Add new event
@app.route ('/event', methods=['POST'])
def addevent():
    eNo = request.form['eNo']
    eName = request.form['eName']
    eDate = request.form['eDate']
    eDesc = request.form['eDesc']

    res = spcall ("newEvent", (eNo, eName, eDate, eDesc), True)
    if 'Event Exists' in res[0][0]:
        return jsonify ({'status': 'error', 'message': res[0][0]})

    return jsonify ({'status': 'ok', 'message': res[0][0]})

#Update event
@app.route('/evt', methods=['POST'])
def updateevt():
    evtNo = request.form['evtNo']
    evtName = request.form['evtName']
    evtDate = request.form['evtDate']
    evtDesc = request.form['evtDesc']

    res = spcall ("updateEvent", (evtNo, evtName, evtDate, evtDesc), True)
    if 'Error' in str(res[0][0]):
        return jsonify ({'status': 'error', 'message': res[0][0]})

    return jsonify ({'status': 'ok', 'message': res[0][0]})

#Delete event
@app.route('/evt/<string:data>', methods=['GET'])
def deleteevt(data):
    res = spcall ("delEvent", (data,), True)
    if 'Error' in str(res[0][0]):
        return jsonify ({'status': 'error', 'message': res[0][0]})

    return jsonify ({'status': 'ok', 'message': res[0][0]})


#View List of meetings
@app.route ('/meetings', methods=['GET'])
def viewMeetinglist():
    res = spcall ('viewMeetinglist', ())

    if 'Error' in str (res[0][0]):
        return jsonify ({'status': 'error', 'message': res[0][0]})
    recs = []

    for r in res:
        recs.append ({"meetingNo": r[0], "meetingName": r[1], "meetingDate": r[2], "meetingDesc": r[3]})
    return jsonify ({'status': 'ok', 'entries': recs, 'count': len (recs)})

#View/Search Meeting details
@app.route('/meetingdetails/<string:data>', methods=['GET'])
def viewMeeting(data):
    res =spcall('viewMeeting',(data,), True)
    print res
    if 'Error' in str(res[0][0]):
        return jsonify({'status':'error', 'message':res[0][0]})

    recs=[]
    for r in res:
        recs.append ({"meetingNo": r[0], "meetingName": r[1], "meetingDate": r[2], "meetingDesc": r[3]})

    return jsonify({'status':'ok', 'entries':recs, 'count':len(recs)})

#Add new meeting
@app.route ('/meeting', methods=['POST'])
def addmeeting():
    mNo = request.form['mNo']
    mName = request.form['mName']
    mDate = request.form['mDate']
    mDesc = request.form['mDesc']

    res = spcall ("newMeeting", (mNo, mName, mDate, mDesc), True)
    if 'Meeting Exists' in res[0][0]:
        return jsonify ({'status': 'error', 'message': res[0][0]})

    return jsonify ({'status': 'ok', 'message': res[0][0]})

#Update meeting
@app.route('/mtng', methods=['POST'])
def updatemtng():
    metNo = request.form['metNo']
    metName = request.form['metName']
    metDate = request.form['metDate']
    metDesc = request.form['metDesc']

    res = spcall ("updateMeeting", (metNo, metName, metDate, metDesc), True)
    if 'Error' in str(res[0][0]):
        return jsonify ({'status': 'error', 'message': res[0][0]})

    return jsonify ({'status': 'ok', 'message': res[0][0]})

#Delete meeting
@app.route('/mtng/<string:data>', methods=['GET'])
def deletemtng(data):
    res = spcall ("delMeeting", (data,), True)
    if 'Error' in str(res[0][0]):
        return jsonify ({'status': 'error', 'message': res[0][0]})

    return jsonify ({'status': 'ok', 'message': res[0][0]})

#View List of transactions
@app.route ('/transactions', methods=['GET'])
def viewTranslist():
    res = spcall ('viewTranslist', ())

    if 'Error' in str (res[0][0]):
        return jsonify ({'status': 'error', 'message': res[0][0]})
    recs = []

    for r in res:
        recs.append ({"transNo": r[0], "transDate": r[1], "deadline": r[2], "ornumber": r[3], "amount": r[4], "particular": r[5]})
    return jsonify ({'status': 'ok', 'entries': recs, 'count': len (recs)})

#View/Search Transaction details
@app.route('/transactiondetails/<string:data>', methods=['GET'])
def viewTrans(data):
    res =spcall('viewTrans',(data,), True)
    print res
    if 'Error' in str(res[0][0]):
        return jsonify({'status':'error', 'message':res[0][0]})

    recs=[]
    for r in res:
        recs.append ({"transNo": r[0], "transDate": r[1], "deadline": r[2], "ornumber": r[3], "amount": r[4], "particular": r[5]})

    return jsonify({'status':'ok', 'entries':recs, 'count':len(recs)})

#Add new transaction
@app.route ('/transaction', methods=['POST'])
def addSocietyTrans():
    tNo = request.form['tNo']
    tDate = request.form['tdate']
    tdeadline = request.form['tdeadline']
    torn = request.form['torn']
    tamt = request.form['tamt']
    tpart = request.form['tpart']

    res = spcall ("newSocietyTrans", (tNo, tDate, tdeadline, torn, tamt, tpart), True)
    if 'Transaction Already Exists' in res[0][0]:
        return jsonify ({'status': 'error', 'message': res[0][0]})

    return jsonify ({'status': 'ok', 'message': res[0][0]})

#Update transaction
@app.route('/soctrans', methods=['POST'])
def updatesoctrans():
    stNo = request.form['stNo']
    stDate = request.form['stdate']
    stdeadline = request.form['stdeadline']
    storn = request.form['storn']
    stamt = request.form['stamt']
    stpart = request.form['stpart']

    res = spcall ("updateTrans", (stNo, stDate, stdeadline, storn, stamt, stpart), True)
    if 'Error' in str(res[0][0]):
        return jsonify ({'status': 'error', 'message': res[0][0]})

    return jsonify ({'status': 'ok', 'message': res[0][0]})

#Delete transaction
@app.route('/soctrans/<string:data>', methods=['GET'])
def deletesoct(data):
    res = spcall ("delTrans", (data,), True)
    if 'Error' in str(res[0][0]):
        return jsonify ({'status': 'error', 'message': res[0][0]})

    return jsonify ({'status': 'ok', 'message': res[0][0]})


@app.after_request
def add_cors(resp):
    resp.headers['Access-Control-Allow-Origin'] = flask.request.headers.get('Origin', '*')
    # resp.headers['Access-Control-Allow-Origin'] = flask.request.headers.get ('Origin')
    resp.headers['Access-Control-Allow-Credentials'] = True
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET, PUT, DELETE'
    resp.headers['Access-Control-Allow-Headers'] = flask.request.headers.get('Access-Control-Request-Headers',
                                                                             'Authorization')
    # set low for debugging

    if app.debug:
        resp.headers["Access-Control-Max-Age"] = '1'
    return resp


if __name__ == '__main__':
    app.run(debug=True)