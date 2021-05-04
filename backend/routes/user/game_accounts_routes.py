# flask imports
from flask import Flask, request
from flask_login import login_user, current_user, logout_user, login_required
#library imports
import requests
import time
import asyncio
import json
import inspect
#sqlalchemy models
from backend.models.user.user_models import Cocaccounts
from backend.models.coc.clan_models import *
from backend.models.coc.player_models import *
# api data call
from backend.api.coc_api import *
#local imports --
#base app imports
from backend import app, db, bcrypt
# helper function imports
from backend.helper_functions.coc.convert import *
from backend.helper_functions.coc.sql_insert import *

# get list of coc accounts linked to user
@login_required
@app.route('/user/game-accounts', methods=['GET'])
def check_game_accounts():
    if current_user.is_authenticated:
        query = Cocaccounts.query.filter_by(user_id=current_user.id).all()
        if len(query) == 0:
            return {"result": "success", "accountNum": 0}
        account_list = list()
        for item in query:
            item_dict = {
                "id": item.id,
                "tag": item.account_tag
            }
            account_list.append(item_dict)
        return {"result": "success", "accountNum": len(account_list), "content": account_list }
    return {"result": "no user logged in"}
    

@login_required
@app.route('/user/add-game-account', methods=['POST'])
def add_game_account():
    incoming_data = request.data.decode('utf-8')
    try:
        account_details = json.loads(incoming_data)
        account_details["Id"] = account_details["Id"].upper()
    except:
        return {"result": "Invalid"}
    if current_user.is_authenticated:
        if account_details["Game"] == "Clash of Clans":
            query = Cocaccounts.query.filter_by(user_id=current_user.id).all()
            if len(query) > 0:
                for item in query:
                    if item.account_tag == account_details["Id"]:
                        return {"result": "account is already linked to your profile"}      
            retrieved_data = call_coc(account_details["Id"], "players")
            coc_insert_account(retrieved_data["tag"],current_user.id)
            coc_insert_player(retrieved_data)
            return {"result": "success", "content": retrieved_data}
        elif account_details["Game"] == "Diablo 3":
            return {"result": "game content not yet build"}
        


    
