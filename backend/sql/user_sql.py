from backend import db
from backend.model_module import User, Settings, Cocaccounts, Cocalliance
from backend.convert_module import user_sql_dict, settings_sql_dict
from backend.coc_module import validate_coc_account, call_coc
from backend.function_module import convert_class
from datetime import datetime, timedelta

import string
import random
import time
# insert new user in to DB (formDict, hashedPassword)
def insert_user(form,password):
    user = User(playername=form["PlayerName"],
    email=form["Email"],
    password=password)
    db.session.add(user)
    db.session.commit()

# insert a player profile account into db with user id linked
def insert_cocaccounts(tag,user, clan_tag, role):
    insert_account = Cocaccounts(account_tag=tag,clan_tag=clan_tag, role=role, user_id=user)
    db.session.add(insert_account)
    db.session.commit()

# insert alliance
def insert_cocalliance(tag, user, role):
    insert_alliance = Cocalliance(alliance_tag=tag, role=role, user_id=user)
    db.session.add(insert_alliance)
    db.session.commit()

# Update user
def update_user(user_id,form):
    user = User.query.filter_by(id=user_id).update(dict(
        player_name=form["playerName"]
    ))
    db.session.commit()

# update users setings
def update_settings(user_id, form):
    settings = Settings.query.filter_by(user_id=user_id).update(dict(
            web_theme=form["theme"]
        ))
    db.session.commit()

# query the user table and if user exist return sql query in dict format
def query_user(user_id):
    query = User.query.filter_by(id=user_id).first()
    if query is None:
        return None
    else:
        return user_sql_dict(query)

# query users coc accounts
def query_cocaccounts(user_id):
    query = Cocaccounts.query.filter_by(user_id=user_id).all()
    print(query)
    if len(query) < 1:
        return None
    else:
        account_list = list()
        for account in query:
            account_list.append(convert_class(account))
        return account_list

def query_cocalliance(user_id):
    query = Cocalliance.query.filter_by(user_id=user_id).all()
    if len(query) < 1:
        return None
    else:
        alliance_list = list()
        for alliance in query:
            alliance_list.append(convert_class(alliance))
        return alliance_list
def delete_cocalliance(form):
    query = Cocalliance.query.filter_by(alliance_tag=form["allianceTag"],user_id=form["user"]).all()
    for entry in query:
        db.session.delete(entry)
        db.session.commit() 
#check if when google auth loggs in a user has been made in DB
def user_check_exists(user_id):
    user_query = User.query.filter_by(id=user_id).first()
    if user_query is None:
        return "does not exist"
    else:
        settings_query = Settings.query.filter_by(user_id=user_id).first()
        user_dict = user_sql_dict(user_query)
        settings_dict = settings_sql_dict(settings_query)
        accounts = query_cocaccounts(user_id)
        alliances = query_cocalliance(user_id)
        return {"user": user_dict, "settings": settings_dict, "accounts": accounts, "alliances": alliances}
# check if a user already has this name
def user_check_name_exists(player_name):
    name_query = User.query.filter_by(player_name=player_name).first()
    if name_query is None:
        return False
    else: 
        return True
# create new user in DB
def create_new_user(user_id):
    # create temp name
    temp_name = name_generator()
    #create Class with User details then add and commit to DB
    user = User(id=user_id,player_name=temp_name)
    db.session.add(user)
    db.session.commit()    
    print(user)
    # create Class with default settings and User id in feign key column
    settings = Settings(user_id=user_id)
    db.session.add(settings)
    db.session.commit()
    # create dict from user and settings class's 
    user_dict = user_sql_dict(user)
    settings_dict = settings_sql_dict(settings)
    print({"user": user_dict, "settings": settings_dict})
    # return dict with user and settings dict's inside 
    return  {"user": user_dict, "settings": settings_dict}

# create a six character string for temp name for user
def name_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

# query and create settings object for settings form
def update_settings_user(user_id, form):
    update_user(user_id, form)
    update_settings(user_id, form)
    return "success"

# add COC account to user's account
def verify_and_insert_account(user_id, form):
    print(user_id)
    # query DB for all accounts currently linked to user
    accounts_query = Cocaccounts.query.filter_by(user_id=user_id).all()
    # if user has accounts linked loop though each and check that the user isn't trying to link an account already linked
    if len(accounts_query) > 0:
            for item in accounts_query:
                if item.account_tag == form["tag"]:
                    return {"result": "account is already linked to your profile"}
    # verifly the user is linking an account they own by using there in-game one use api token from in-game settings menu
    if validate_coc_account(form["tag"], "verify", form["APIToken"]):
        # once verify function is successful request accounts details and insert into DB and add to users accounts table
        print("inside validate If statement")
        retrieved_data = call_coc(form["tag"], "players")     
        if "clan" in retrieved_data.keys():
            clan_data = call_coc(retrieved_data["clan"]["tag"], "clan")
            time.sleep(0.5)
            player_member = dict()
            for member in clan_data["memberList"]:
                if member["tag"] == retrieved_data["tag"]:
                    player_member = member
                    break
            insert_cocaccounts(retrieved_data["tag"],user_id,retrieved_data["clan"]["tag"], player_member["role"] )
        return {"result": "success"}
    # if verifly failed return inccorect token
    else:
        print("It was False")
        return {"result": "incorrect token"}
#def update_user_alliance(form):
#    query = 


