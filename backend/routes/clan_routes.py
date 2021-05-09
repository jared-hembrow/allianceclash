# flask imports
from flask import Flask, request
#library imports
import time
import json
from backend.model_module import Clan, Warlog
from backend.sql_module import *
#base app imports
from backend import app, db

@app.route('/api/user/missed-attack', methods=["POST",'GET'])
def add_missed_attack():
    # posting a missed attack from front end
    if request.method == "POST":
        # decode the incoming post body into Dict
        form = json.loads(request.data.decode('utf-8'))
        print(form)
        try:
            # create class model with form data
            insert = Missed_attacks(
                name=form["missedAttack"]["name"],
                tag=form["missedAttack"]["tag"],
                war_type=form["missedAttack"]["type"],
                missed_attacks_number=form["missedAttack"]["missedAttacks"],
                submitted_by=form["userId"],
                clan_tag=form["clanTag"],
                clan_id=form["clanId"]
                )
            # insert data into DB
            db.session.add(insert)
            db.session.commit()
            # return result
            return {"result": "success"}
        except:
            return {"result": "unsuccessful"}
    elif request.method == "GET":
        print(type(request.args.get('id')))
        query = Missed_attacks.query.filter_by(clan_id=str(request.args.get('id'))).all()


        return {"result": "success", "content": [convert_class(attack) for attack in query]}





# everything below pending actions



@app.route('/coc/clan/profile', methods=["GET"])
def view_clan_profile():
    tag = request.args.get('tag')
    print(tag)
    clan_data = insert_or_update_clan(tag)
    warlog_data = insert_or_update_warlog(tag)
    return {"result": "success", "content": {"clan": clan_data, "warLog": warlog_data}}


@app.route('/coc/clan/profile/multiple', methods=['POST'])
def view_multiple_clan_profile():
    incoming_data = request.data.decode('utf-8')
    tags = json.loads(incoming_data)
    print(tags)
    clan_list = list()
    warlog_list = list()
    if len(tags) < 1:
        return {"result": "empty array"}
    for tag in tags:
        if tag == "": 
            continue
        clan_data = insert_or_update_clan(tag)
        clan_list.append(clan_data)
        warlog_data = insert_or_update_warlog(tag)
        warlog_list.append(warlog_data)
    
    return {"result": 'success', "content": {
        "clans": clan_list, "warlogs": warlog_list
    }}
# get user's clan details linked to user
@app.route('/clan/details', methods=["GET"])
def get_clan_details():
    user_id = request.args.get('id')
    user_accounts = query_cocaccounts(user_id)
    account_list = list()
    for account in user_accounts:
        print(account)
        player = insert_or_update_player(account["account_tag"])
        print("player")
        clan = insert_or_update_clan(player["clan_tag"])
        war_log = insert_or_update_warlog(clan["tag"])
        current_war = insert_or_update_currentwar(clan["tag"])
        alliance = query_allianceclan('looking for clan membership',clan["tag"])
        account_list.append({
            "profile": player,
            "clan": clan,
            "warLog": war_log,
            "currentWar": current_war,
            "alliance": alliance,
            "role": account["role"]
        })
    return {"result": "success", "content": account_list}
# clan action to leave alliance
@app.route('/clan/leave-alliance', methods=["POST"])
def leave_alliance():
    incoming_data = request.data.decode('utf-8')
    form = json.loads(incoming_data)
    clan_leave_alliance(form)
    return {"result": "success"}
#fetch list of invites
@app.route('/clan/invitelist', methods=["GET"])
def fetch_alliance_invites():
    tag = request.args.get('tag')
    invites = query_alliance_invite(tag)
    print(tag)
    return {"result": "success", "content": invites}
@app.route('/clan/accept-invite', methods=["POST"])
def accept_invite():
    incoming_data = request.data.decode()
    form = json.loads(incoming_data)
    delete_alliance_invite(form["allianceTag"], form["clanTag"])
    insert_alliance_clans([{"tag": form["clanTag"], "name": form["clanName"]}], form["allianceTag"])
    print(form)
    return {"result": "success"}