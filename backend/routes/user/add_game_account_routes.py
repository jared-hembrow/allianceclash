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
# api data call
from backend.api.coc_api import call_coc
#sql crud
from backend.sql.user_insert import user_insert_coc_account
from backend.sql.coc_insert import coc_insert_player
#base app imports
from backend import app, db, bcrypt
# helper function imports

@app.route('/user/add-game-account', methods=['POST'])
def add_game_account():
    incoming_data = request.data.decode('utf-8')
    try:
        account_details = json.loads(incoming_data)
        account_details["Id"] = account_details["Id"].upper()
    except:
        return {"result": "Invalid"}
    if current_user.is_authenticated:
        query = Cocaccounts.query.filter_by(user_id=current_user.id).all()
        if len(query) > 0:
            for item in query:
                if item.account_tag == account_details["Id"]:
                    return {"result": "account is already linked to your profile"}
        if validate_coc_account(account_details["Id"], "verify", account_details["APIToken"]):
            print("inside validate If statement")
            retrieved_data = call_coc(account_details["Id"], "players")        
            user_insert_coc_account(retrieved_data["tag"],current_user.id)
            coc_insert_player(retrieved_data)
            return {"result": "success", "content": retrieved_data}
        else:
            print("It was False")
            return {"result": "incorrect token"}
    return {"result": "error"}
        
def validate_coc_account(tag, call_type, token):
    verify = call_coc_verify(tag, call_type, token)
    print(verify)
    if verify["status"] == "ok":
        return True
    else:
        return False
    
def call_coc_verify(id_tag, call_type, token):
    parsed_tag = id_tag[1:]
    api_data = asyncio.run(pull_data_verify(parsed_tag,call_type, token))
    decoded_response = api_data.content.decode('utf-8')
    if decoded_response == "Invalid peremeter":
        print("response from api call",decoded_response)
        return {"result": "invalid"}
    print(decoded_response)
    coc_dict = json.loads(decoded_response)
    return coc_dict

async def pull_data_verify(tag, api_type, token):
    url = f'http://www.debtcollectors.pyrokat.xyz/coc?tag={tag}&type={api_type}&token={token}'
    print(url)
    loop = asyncio.get_event_loop()
    call = loop.run_in_executor(None, requests.get, url)
    response = await call
    return response
    
