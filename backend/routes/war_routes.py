# flask imports
from flask import Flask, request
from flask_login import login_user, current_user, logout_user, login_required
#library imports
import json
import time
#base app imports
from backend import app
# sql
from backend.sql_module import insert_or_update_currentwar,insert_or_update_player


@app.route("/coc/war", methods=['GET'])
def current_war_details():
    clan_tag = request.args.get('clantag')
    parse_tag = clan_tag.replace("%23","#")
    tag = parse_tag.replace('"', "")   
    print("the tag",tag)     
    data = insert_or_update_currentwar(tag)
    return {"result": "success", "content": data }
# fetch two players for war attack post
@app.route("/user/coc/currentwar/postdetails", methods=['GET'])
def fetch_player_profile():
    tag = request.args.get('tag')
    opponent_tag = request.args.get('optag')
    print(tag, opponent_tag)
    get_player = insert_or_update_player(tag)
    time.sleep(0.5)
    get_opponent_player = insert_or_update_player(opponent_tag)
    return {"result": "success", "content": {"player": get_player, "opponent": get_opponent_player}}