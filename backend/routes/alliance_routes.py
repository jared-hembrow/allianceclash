# flask imports
from flask import Flask, request
# datetime import
from datetime import datetime, timedelta
#library imports
import requests
import time
import asyncio
import json
import inspect
#sql
from backend.sql_module import *
from backend import app
# route to recieve form from react and process it and if valid insert into DB
@app.route("/user/alliance/new", methods=["POST"])
def create_alliance():
    incoming_data = request.data.decode('utf-8')
    new_alliance_form = json.loads(incoming_data)
    new_alliance_form["tag"] = new_alliance_form["tag"].strip()
    user_id = request.args.get('id')
    print(new_alliance_form)
    user = User_sql(user_id)
    new_alliance = Alliance_sql(new_alliance_form["tag"])
    create_alliance = new_alliance.create_new_alliance(new_alliance_form, user_id)
    if create_alliance["result"] == "success":
        user.insert_cocalliance({
            "tag": new_alliance.tag,
            "role": "leader"
        })
        return {"result": "success"}
    else:
        return create_alliance

# serve user there alliance details to render in react
@app.route("/user/alliance/profile", methods=["GET","POST"])
def fetch_alliance_details():
    if request.method == "GET":
        user_id = request.args.get('id')
        user_alliances = query_cocalliance(user_id)
        if user_alliances is None:
            return {"result": "None"}
        alliance_list = list()
        for alliance in user_alliances:
            alliance_data = query_alliance(alliance["alliance_tag"])
            alliance_list.append(alliance_data)
        return {"result": "success", "content": alliance_list}
    if request.method == "POST":
        incoming_data = request.data.decode()
        request_list = json.loads(incoming_data)
        print(request_list)
        alliance_list = list()
        for alliance in request_list:
            alliance_data = query_only_alliance(alliance["alliance_tag"])
            if alliance_data is None:
                continue
            else:
                alliance_list.append(alliance_data)
        return {"result": "success", "content": alliance_list}

# route to handle alliance chat and announcements
@app.route('/api/alliance/message', methods=['POST','GET'])
def alliance_message_board():
    # if post request
    if request.method == 'POST':
        # load data body from json into dict
        post = json.loads(request.data.decode('utf-8'))
        print(post)
        #check if body has a type key and if message has characters
        if not "type" in post.keys() or post["message"] == '':
            # return invalid if so
            return {"result": "invalid"}
        # query the alliance with tag provided
        alliance_query = query_alliance(post["allianceTag"])
        # if announcment request
        if post["type"] == "announcement":
            # insert message into DB
            insert_alliancemessageboard(post["message"], post["userId"], alliance_query["id"])
            return {"result": "success"}
        # if alliance chat request
        elif post["type"] == "chat":
            # insert message into DB
            insert_alliancechat(post["message"], post["userId"], alliance_query["id"])
            return {"result": "success"}
    # if get request
    if request.method == 'GET':
        # asign type and tag to varibles
        request_type = request.args.get('type')
        tag = request.args.get('tag')
        # query alliance with Tag provided
        alliance_query = query_alliance(tag)
        # if announcement request
        if request_type == "announcement":
            # query messages
            messages = query_alliancemessageboard(alliance_query["id"])
            # loop though messages for authors name
            for message in messages:
                user_query = query_user(message["postedBy"])
                if user_query is None:
                    message["author"] = ''
                    continue
                message["author"] = user_query["playerName"]
            # return announcements
            return {"result": "success", "content": messages}
        # if chat request
        elif request_type == "chat":
            # query messages
            messages = query_alliancechat(alliance_query["id"])
            # loop though messages for authors name
            for message in messages:
                user_query = query_user(message["postedBy"])
                if user_query is None:
                    message["author"] = ''
                    continue
                message["author"] = user_query["playerName"]
            # return messages
            return {"result": "success", "content": messages}
        
@app.route('/user/alliance/invite-clan', methods=['POST'])
def send_invite():
    form = json.loads(request.data.decode())
    alliance = Alliance_sql(form["tag"])
    for clan in form["clan"]:
        insert_form = {
            "message": clan["message"],
            "tag": form["tag"],
            "name": form["name"],
            "clanName": clan["name"],
            "clanTag": clan["tag"],
            "user": form["user"]
        }
        insert_alliance_invite(insert_form)
    print(form)
    return {"result": "success"}
    
# alliance leader kicks a clan out
@app.route('/alliance/kick-clan', methods=["POST"])
def kick_clan_out():
    incoming_data = request.data.decode('utf-8')
    form = json.loads(incoming_data)
    clan_leave_alliance(form)
    delete_cocalliance(form)
    print(form)
    return {"result": "success"}

@app.route('/alliance/requests', methods=["GET"])
def get_alliance_requests():
    alliance_tag = request.args.get('tag')
    join_list = query_join_request(alliance_tag)
    return {"result": "success", "content": join_list}

@app.route('/alliance/accept-join-request', methods=["POST"])
def accept_join_request():
    incoming_data = request.data.decode('utf-8')
    form = json.loads(incoming_data)
    print(form)
    insert_alliance_clans([{
        "name": form["clanName"],
        "tag": form["clanTag"]
        }], form["allianceTag"])
    
    delete_join_request(form["allianceTag"], form["clanTag"])
    return {"result": "success"}