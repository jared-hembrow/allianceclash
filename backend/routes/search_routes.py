# flask imports
from flask import Flask, request
from backend import app
from backend.sql_module import *
    
import json
@app.route('/api/search', methods=["GET"])
def search_database():
    search_type = request.args.get('type')
    term = request.args.get('term')
    print(search_type, term)
    if search_type == "clan":
        clan_search_list = search_clan(term)
        return {"result": "success", "content": clan_search_list}
    if search_type == "player":
        player_search_list = search_player(term)
        return {"result": "success", "content": player_search_list}
    return {"result": "unsuccess"}

@app.route('/api/invite', methods=["POST"])
def invite_request_join():
    incoming_data = request.data.decode()
    form = json.loads(incoming_data)
    if form["type"] == "allianceInvite":
        insert_update_alliance_invite(form)
        return {"result": "success"}
    if form["type"] == "allianceApply":
        insert_update_join_request(form)
        return {"result": "success"}
    print(form)
    return {"result": "api hit the server boom"}