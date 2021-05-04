from backend.model_module import (
    Clan,
    Clanmemberslist,
    Warlog, 
    Currentwar,
    Allianceclans,
    Allianceleaders,
    Cocalliance,
    Cocaccounts,
    Player
    )
from backend.convert_module import clan_sql_dict,clan_member_sql_dict, warlog_sql_dict, currentwar_sql_dict 
from backend.function_module import date_compare, convert_class
from backend.coc_module import call_coc
from backend import db
from datetime import datetime, timedelta

# table -Clan- & -Clanmemberslist- END -line 146-
# insert clan profile into Table
def insert_clan(clan):
    # create object with Clan class and clan paremter
    insert_clan = Clan(
        tag=clan["tag"],
        name=clan["name"], 
        invite_type=clan["type"], 
        description=clan["description"], 
        badge_url=clan["badgeUrls"], 
        clan_level=clan["clanLevel"], 
        clan_points=clan["clanPoints"], 
        clan_versus_points=clan["clanVersusPoints"], 
        required_trophies=clan["requiredTrophies"], 
        war_frequency=clan["warFrequency"], 
        war_win_streak=clan["warWinStreak"], 
        war_wins=clan["warWins"], 
        war_ties=clan["warTies"], 
        war_losses=clan["warLosses"], 
        is_warlog_public=clan["isWarLogPublic"], 
        war_league=clan["warLeague"], 
        member_count=clan["members"], 
        labels=clan["labels"])
    # if clan has a location set insert oelse leave as empty dict
    if "location" in clan.keys():
        insert_clan.location = clan["location"]
    else:
        insert_clan.location = {}
    db.session.add(insert_clan)
    db.session.commit()
    query = Clan.query.filter_by(tag=insert_clan.tag).first()
    # insert each member in to Clanmemberslist table with for loop
    for member in clan["memberList"]:
        insert_members = Clanmemberslist(
        tag=member["tag"],
        name=member["name"],
        role=member["role"],
        exp_level=member["expLevel"],
        league=member["league"],
        trophies=member["trophies"], 
        versus_trophies=member["versusTrophies"], 
        clan_rank=member["clanRank"], 
        previous_clan_rank=member["previousClanRank"], 
        donations=member["donations"], 
        donations_received=member["donationsReceived"], 
        clan_id=query.id 
        )
        db.session.add(insert_members)
        db.session.commit()

# update db with clan profile
def update_clan(tag):
    # call COC api and get current data
    clan = call_coc(tag, "clan")
    # query database and update with dict with current data
    clan_query = Clan.query.filter_by(tag=tag).first()
    update_clan = Clan.query.filter_by(tag=tag).update(dict(
    tag=clan["tag"], 
    name=clan["name"], 
    invite_type=clan["type"], 
    description=clan["description"], 
    location=clan['location'], 
    badge_url=clan["badgeUrls"],
    clan_level=clan["clanLevel"], 
    clan_points=clan["clanPoints"], 
    clan_versus_points=clan["clanVersusPoints"], 
    required_trophies=clan["requiredTrophies"], 
    war_frequency=clan["warFrequency"], 
    war_win_streak=clan["warWinStreak"], 
    war_wins=clan["warWins"], 
    war_ties=clan["warTies"], 
    war_losses=clan["warLosses"], 
    is_warlog_public=clan["isWarLogPublic"], 
    war_league=clan["warLeague"], 
    member_count=clan["members"], 
    labels=clan["labels"]))
    db.session.commit()
    # update or insert members into clan members list Table
    for member in clan["memberList"]:
        # loop though all existing members
        query = Clanmemberslist.query.filter_by(tag=member["tag"]).first()
        # if members desn't exist in database under clan insert into database
        if query is None:
            # create model object with member data
            insert_members = Clanmemberslist(
                tag=member["tag"],
                name=member["name"],
                role=member["role"],
                exp_level=member["expLevel"],
                league=member["league"],
                trophies=member["trophies"], 
                versus_trophies=member["versusTrophies"], 
                clan_rank=member["clanRank"], 
                previous_clan_rank=member["previousClanRank"], 
                donations=member["donations"], 
                donations_received=member["donationsReceived"], 
                clan_id=clan_query.id 
                )
            # add object to session and commit to database
            db.session.add(insert_members)
            db.session.commit()
        else:
            # else if member exists update database with current data by  query and updating with dict
            update_member = Clanmemberslist.query.filter_by(tag=member["tag"]).update(dict(
                tag=member["tag"],
                name=member["name"],
                role=member["role"],
                exp_level=member["expLevel"],
                league=member["league"],
                trophies=member["trophies"], 
                versus_trophies=member["versusTrophies"], 
                clan_rank=member["clanRank"], 
                previous_clan_rank=member["previousClanRank"], 
                donations=member["donations"], 
                donations_received=member["donationsReceived"], 
                clan_id=clan_query.id 
            ))
            # commit to database
            db.session.commit()
    # query all member in table under clan
    check_existing_members = Clanmemberslist.query.filter_by(clan_id=clan_query.id).all()
    # loop though all members in table and check if they match up with current members in clan
    for member in check_existing_members:
        # set boolean to false
        is_in_clan = False
        # loop though current members from current data
        for existing_member in clan["memberList"]:
            # if match then change var and break out of loop
            if member.tag == existing_member["tag"]:
                is_in_clan = True
                break
            else:
                continue
        # if boolean true then member is in clan - continue to next memebr to check
        if is_in_clan:
            continue
        # if no matchs change boolean then member is not currently in clan - delete out of table
        else:
            delete_member = Clanmemberslist.query.filter_by(id=member.id).first()
            db.session.delete(delete_member)
            db.session.commit()
            continue
    # return current data from COC api
    return clan   

# table -Warlog- -END line 162 -
# insert clans warlog into db
def insert_warlog(log,tag):
    insert_log = Warlog(clan_tag=tag,war_list=log)
    db.session.add(insert_log)
    db.session.commit()
# update clans war log details
def update_warlog(tag):
    log = call_coc(tag, "warlog")
    insert_log = Warlog.query.filter_by(clan_tag=tag).update(dict(
        date_updated=datetime.utcnow(),
        clan_tag=tag,
        war_list=log))
    db.session.commit()
    return log

# Table -Currentwar- -END line 196 -      
# insert clans current war details into db
def insert_currentwar(war):
    insert_war = Currentwar(
    state=war["state"],
    clan_tag=war["clan"]["tag"], 
    opponent_tag=war["opponent"]["tag"], 
    team_size=war["teamSize"], 
    preparation_start_time=war["preparationStartTime"], 
    start_time=war["startTime"], 
    end_time=war["endTime"], 
    clan=war["clan"], 
    opponent=war["opponent"])
    db.session.add(insert_war)
    db.session.commit()
# update db with clans current war details
def update_currentwar(tag):
    war = call_coc(tag, "currentwar")
    if war["state"] == "notInWar":
        return war
    insert_war = Currentwar.query.filter_by(clan_tag=tag).update(dict(
        date_updated=datetime.utcnow(),
        state=war["state"],
        clan_tag=war["clan"]["tag"], 
        opponent_tag=war["opponent"]["tag"], 
        team_size=war["teamSize"], 
        preparation_start_time=war["preparationStartTime"], 
        start_time=war["startTime"], 
        end_time=war["endTime"], 
        clan=war["clan"], 
        opponent=war["opponent"] ))
    db.session.commit()
    return war

# query clan update or call coc api and insert if needed
def insert_or_update_clan(tag):
    clan_query = Clan.query.filter_by(tag=tag).first()
    clan_dict = dict()
    if clan_query is None:
        retrieved_data = call_coc(tag, "clan")
        insert_clan(retrieved_data)
    elif date_compare(clan_query.date_updated, 0, 1, 0):
        clan_data = update_clan(tag)
        clan_dict = clan_data
    else:
        clan_dict = convert_class(clan_query)
    return clan_dict

# query clan warlog or call coc api and insert if needed
def insert_or_update_warlog(tag):
    warlog_query = Warlog.query.filter_by(clan_tag=tag).first()
    warlog_dict = dict()
    if warlog_query is None:
        retrieved_data = call_coc(tag, "warlog")
        insert_warlog(retrieved_data, tag)
        warlog_dict = {"log": retrieved_data}
    elif date_compare(warlog_query.date_updated, 0, 12, 0):
        print("warlog true")
        log = update_warlog(tag)
        warlog_dict = {"log": log}
    else :
        warlog_dict = warlog_sql_dict(warlog_query)
    return warlog_dict

# query current war table and if doesn't exist insert with api data fetch from COC
def insert_or_update_currentwar(tag):
    query = Currentwar.query.filter_by(clan_tag=tag).first()
    if query is None:
        retrieved_data = call_coc(tag, 'currentwar')
        if retrieved_data["state"] == "inWar" or retrieved_data["state"] == "preparation":
            insert_currentwar(retrieved_data)
            return retrieved_data
        else:
            return retrieved_data
    elif date_compare(query.date_updated, 0, 0, 5):
        current_war_data = update_currentwar(tag)
        return current_war_data
    else:
        return currentwar_sql_dict(query)

# clan leave alliance
def clan_leave_alliance(form):
    # query clan linked to alliance and delete
    alliance_clans_query = Allianceclans.query.filter_by(alliance_id=form["alliance"],tag=form["clan"]).all()
    for clan in alliance_clans_query:
        db.session.delete(clan)
        db.session.commit()
    # query all leaders linked to alliance and clan and delete
    leaders_query = Allianceleaders.query.filter_by(clan_tag=form["clan"], alliance_id=form["alliance"]).all()
    for leader in leaders_query:
        db.session.delete(leader)
        db.session.commit()
    # query user links to alliance and clan and delete them
    user_linked_query = Cocalliance.query.filter_by(alliance_tag=form["allianceTag"]).all()
    for user in user_linked_query:
        user_accounts_query = Cocaccounts.query.filter_by(user_id=user.user_id).all()
        for account in user_accounts_query:
            player_query = Player.query.filter_by(tag=account.account_tag).first()
            if player_query.clan_tag == form["clan"]:
                db.session.delete(user)
                db.session.commit()
                continue
            else:
                continue
        

