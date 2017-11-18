#!flask/bin/python
from flask import Flask, jsonify, request
from flask_httpauth import HTTPBasicAuth
from flask import render_template, redirect, url_for, session, flash
from model import DBconn
import sys, flask, os
import warnings
from flask.exthook import ExtDeprecationWarning

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
		recs.append ({"idnum": r[0], "fname": r[1], "mname": r[2], "lname": r[3], "yearLevel": r[4], "contactnum": r[5], "liability": r[6], "clearanceStat": r[7]}))

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
		recs.append ({"eventNo": r[0], "eventName": r[1], "eventDate": r[2], "eventDesc": r[3]}))

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