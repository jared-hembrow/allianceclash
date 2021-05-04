# import model classs from model module
from backend.model_module import *
from backend.convert_module import *
from backend.coc_module import call_coc
from backend.function_module import date_compare
from backend import db
from datetime import datetime, timedelta

import time
# table - Alliance --
# insert alliance profile into alliacne table db
def insert_alliance(alliance):
    insert_alliance = Alliance(
        tag=alliance["tag"],
        name=alliance['name'],
        description=alliance['description'], 
        )
    db.session.add(insert_alliance)
    db.session.commit()
# insert clan alliance list of clans into db
def insert_alliance_clans(clans, alliance_tag):
    query = Alliance.query.filter_by(tag=alliance_tag).first()
    if query is None:
        return "alliance does not exist"
    for clan in clans:
        insert_clan = Allianceclans(tag=clan["tag"], 
        name=clan["name"], 
        alliance_id=query.id )
        db.session.add(insert_clan)
        db.session.commit()
    return "success"
# insert alliance leader
def insert_allianceleaders(form, alliance_tag):
    query = Alliance.query.filter_by(tag=alliance_tag).first()
    if query is None:
        return "alliance does not exist"
    for leader in form:
        insert = Allianceleaders(
            tag=leader["id"],
            clan_tag=leader["clanTag"],
            role=leader["role"],
            alliance_id=query.id
            )
        db.session.add(insert)
        db.session.commit()
    return "success"
    
def insert_alliancemessageboard(post, user_id, alliance_id):
    insert = Alliancemessageboard(message=post,posted_by=user_id,alliance_id=alliance_id)
    db.session.add(insert)
    db.session.commit()


# ?? not sure to put this in Class might be best put into API route function
def query_allianceclan(query_type, identifier):
    if query_type == "looking for clan membership":
        query = Allianceclans.query.filter_by(tag=identifier).first()
        if query is None:
            return None
        else:
            alliance_query = Alliance.query.filter_by(id=query.alliance_id).first()
            return alliance_sql_dict(alliance_query)
    elif query_type == 'looking for clan in alliance':
        query = Allianceclans.query.filter_by(alliance_id=identifier).all()
        if len(query) < 1:
            return []
        clan_list = list()
        for clan in query:
            clan_list.append(allianceclans_sql_dict(clan))
        return clan_list
# ^^^^^----------------------------------^^^^^^^^^


def query_alliancemessageboard(alliance_id):
    query = Alliancemessageboard.query.filter_by(alliance_id=alliance_id).all()
    message_list = list()
    for message in query:
        message_dict = alliancemessageboard_sql_dict(message)
        message_list.append(message_dict)
    return message_list
def insert_alliancechat(post, user_id, alliance_id):
    insert = Alliancechat(message=post,posted_by=user_id,alliance_id=alliance_id)
    db.session.add(insert)
    db.session.commit()
def query_alliancechat(alliance_id):
    query = Alliancechat.query.filter_by(alliance_id=alliance_id).limit(25)
    message_list = list()
    for message in query:
        message_list.append(alliancechat_sql_dict(message))
    return message_list
# query alliance
def query_only_alliance(tag):
    alliance = Alliance.query.filter_by(tag=tag).first()
    if alliance is None:
        return None
    else:
        return alliance_sql_dict(alliance)    

def query_alliance(alliance_tag):
    alliance = Alliance.query.filter_by(tag=alliance_tag).first()
    clans = Allianceclans.query.filter_by(alliance_id=alliance.id).all()
    leaders = Allianceleaders.query.filter_by(alliance_id=alliance.id).all()
    clans_list = list()
    leaders_list = list()
    for clan in clans:
        clan_dict = allianceclans_sql_dict(clan)
        clans_list.append(clan_dict)
    for leader in leaders:
        leader_dict = allianceleaders_sql_dict(leader)
        leaders_list.append(leader_dict)
    alliance_dict = alliance_sql_dict(alliance)
    alliance_dict["clans"] = clans_list
    alliance_dict["leaders"] = leaders_list
    return alliance_dict

# check when creating a new alliance that an alliance with that name doesn't already exists
def check_alliance_name(alliance_name):
    check_name = Alliance.query.filter_by(name=alliance_name).first()
    if check_name is None:
        return True
    else:
        return False
        
# check if clans are already linked to an existing alliance
def check_clans_in_alliance(clans):
    clan_linked = list()
    for clan in clans:
        check_clan = Allianceclans.query.filter_by(tag=clan["tag"]).first()
        if check_clan is None:
            continue
        else:
            clan_linked.append(clan["tag"])
    return clan_linked
# find Leaders in each clan
def find_leader(member_list):
    leader = dict()
    for member in member_list:
        if member["role"] == "leader":
            leader = {
                "name": member['name'],
                "tag": member['tag']
            }
    return leader
# handle Creation of new alliance
def create_new_alliance(form,user_id):
# check form with DB
    # check if alliance name
    if check_alliance_name(form["name"]) is False:
        return {"result": "name already exists"}
    # check clans perposed to be in alliace
    check_clans = check_clans_in_alliance(form["clan"])
    if len(check_clans) > 0:
        return {"result": "clans already linked to alliance", "clans": check_clans }
    # handle the clans and leader
        # creates lists
    clan_list = list()
    # loop over clans perposed to be in alliance
    user_account_query = Cocaccounts.query.filter_by(user_id=user_id).first()
    user_player_query = Player.query.filter_by(tag=user_account_query.account_tag).first()
    print(user_player_query)
    leader = [{
        "id": user_id,
        "clanTag": user_player_query.clan_tag,
        "role": "leader"
    }]
    for clan in form['clan']:
        clan_query = Clan.query.filter_by(tag=clan['tag']).first()
        if clan_query is None:
            clan_data = call_coc(clan['tag'], 'clan')
            time.sleep(1)
            if "reason"  in clan_data.keys():
                return {"result": "clan does not exist", "clan": clan["tag"]}
            clan_list.append(clan_data)
        else:
            clan_dict = clan_sql_dict(clan_query)
            clan_list.append(clan_dict)
    insert_alliance(form)
    alliance_clans_status = insert_alliance_clans(clan_list, form['tag'])
    if alliance_clans_status == "alliance does not exist":
        return {"result": "unsuccessful"}
    insert_allianceleaders(leader,form["tag"])
    return {"result": "success"}

# invites and requests
def insert_alliance_invite(form):
    insert = Alliance_invite(
    message=form["message"],
    alliance_name=form["name"],
    alliance_tag=form["tag"],
    clan_name=form["clanName"],
    clan_tag=form["clanTag"],
    sent_by=form["user"]
    )
    db.session.add(insert)
    db.session.commit()

def insert_update_alliance_invite(form):
    query = Alliance_invite.query.filter_by(alliance_name=form["name"],clan_tag=form["clanTag"]).first()
    if query is None:
        insert_alliance_invite(form)
    else:
        Alliance_invite.query.filter_by(alliance_name=form["name"],clan_tag=form["clanTag"]).update(dict(
            alliance_name=form["name"],
            alliance_tag=form["tag"],
            clan_name=form["clanName"],
            clan_tag=form["clanTag"],
            message=form["message"],
            sent_by=form["user"]
                ))
        db.session.commit()
    
def insert_join_request(form):
    insert = Join_request(
        message=form["message"],
        alliance_name=form["name"],
        alliance_tag=form["tag"],
        clan_name=form["clanName"],
        clan_tag=form["clanTag"],
        sent_by=form["user"]
            )
    db.session.add(insert)
    db.session.commit()
def insert_update_join_request(form):
    query = Join_request.query.filter_by(alliance_name=form["name"],clan_tag=form["clanTag"]).first()
    if query is None:
        insert_join_request(form)
    else:
        Join_request.query.filter_by(alliance_name=form["name"],clan_tag=form["clanTag"]).update(dict(
            alliance_name=form["name"],
            alliance_tag=form["tag"],
            clan_name=form["clanName"],
            clan_tag=form["clanTag"],
            message=form["message"],
            sent_by=form["user"]
                ))
        db.session.commit()
def query_join_request(tag):
    query = Join_request.query.filter_by(alliance_tag=tag).all()
    join_list = list()
    if len(query) > 0:
        for application in query:
            join_list.append(join_request_sql_dict(application))
    return join_list
def delete_join_request(alliance_tag, clan_tag):
    query = Join_request.query.filter_by(alliance_tag=alliance_tag, clan_tag=clan_tag).first()
    db.session.delete(query)
    db.session.commit()
def query_alliance_invite(clan_tag):
    query = Alliance_invite.query.filter_by(clan_tag=clan_tag).all()
    dict_list = list()
    for invite in query:
        dict_list.append(alliance_invite_sql_dict(invite))
    return dict_list
def delete_alliance_invite(alliance_tag, clan_tag):
    query = Alliance_invite.query.filter_by(alliance_tag=alliance_tag, clan_tag=clan_tag).first()
    db.session.delete(query)
    db.session.commit()
