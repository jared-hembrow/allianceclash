from backend.sql_module import *
from backend.model_module import *
from backend.function_module import *
# user class
class User_sql:
    # create the class with the user_id
    def __init__(self, user_id):
        self.user_id = user_id
    # insert into user Table into DB

    def insert_user(self, form):
        #create user class
        insert = User(id = form["id"], player_name = form["player_name"])
        # insert user into Table
        db.session.add(insert)
        db.session.commit()

    # insert into settings table
    def insert_settings(self):
        # create settings class with default settings
        insert = Settings(user_id=self.user_id)
        # insert into DB
        db.session.add(insert)
        db.session.commit()

    #insert into cocaccounts table
    def insert_cocaccounts(self, form):
        # create class with form details
        insert = Cocaccounts(
            account_tag = form["tag"],
            clan_tag = form["clan_tag"], 
            role = form["role"], user_id = self.user_id
            )
        # insert into DB
        db.session.add(insert)
        db.session.commit()
    
    # insert alliance
    def insert_cocalliance(self, form):
        insert = Cocalliance(
            alliance_tag = form["tag"], 
            role = form["role"], 
            user_id = self.user_id
            )
        # insert into DB
        db.session.add(insert)
        db.session.commit()

    # create new user account
    def create_new_user(self):
        # insert default settings into user table
        self.insert_user({
            "id": self.user_id,
            "player_name": name_generator()
        })
        self.insert_settings()

    #update user Table
    def update_user(user_id,form):
        # query and update with dict
        user = User.query.filter_by(id = self.user_id).update(dict(
        player_name=form["playerName"]
        ))
        # update DB
        db.session.commit()

    # update settings table
    def update_settings(user_id, form):
        # query and update with dict
        settings = Settings.query.filter_by(user_id=self.user_id).update(dict(
            web_theme=form["theme"]
            ))
        # update db
        db.session.commit()

    # query user Tables
    def query(self, table):
        # select which table and convert query results to dict and return
        if table == "user":
            return convert_class(User.query.filter_by(id=self.user_id).first())
        elif table == "settings":
            return convert_class(Settings.query.filter_by(user_id=self.user_id).first())
        elif table == "cocaccounts":
            return [convert_class(account) for account in Cocaccounts.query.filter_by(user_id=self.user_id).all()]
        elif table == "cocalliance":
            return [convert_class(alliance) for alliance in Cocalliance.query.filter_by(user_id=self.user_id).all()]
        # if all return all tables in a dict
        elif table == "all":
            return {
                "user": convert_class(User.query.filter_by(id=self.user_id).first()),
                "settings": convert_class(Settings.query.filter_by(user_id=self.user_id).first()),
                "cocaccounts": [convert_class(account) for account in Cocaccounts.query.filter_by(user_id=self.user_id).all()],
                "cocalliance": [convert_class(alliance) for alliance in Cocalliance.query.filter_by(user_id=self.user_id).all()]
            }
    def profile(self):
        user_table = self.query("all")
        player_profiles = list()
        alliance_profiles = list()
        for account in user_table["cocaccounts"]:
            print(account)
            player = Player_sql(account["account_tag"])
            player_data = player.profile()
            clan = Clan_sql(player_data["clan_tag"])
            player_profiles.append({
                "player": player.profile(),
                "clan": clan.profile()
            })
        for alliance in user_table["cocalliance"]:
            alliance = Alliance.query.filter_by(tag=alliance["alliance_tag"]).first()
            alliance_profiles.append({
                "alliance": convert_class(alliance),
                "clans": [convert_class(clan) for clan in Allianceclans.query.filter_by(alliance_id=alliance.id).all()],
                "leaders": [convert_class(leader) for leader in Allianceleaders.query.filter_by(alliance_id=alliance.id).all()],
                "messageBoard": [convert_class(message) for message in Alliancemessageboard.query.filter_by(alliance_id=alliance.id).all()],
                "chat": [convert_class(message) for message in Alliancechat.query.filter_by(alliance_id=alliance.id).all()],
                "joinRequests": [convert_class(request) for request in Join_request.query.filter_by(alliance_tag=alliance.tag).all()],
                "invites": [convert_class(invite) for invite in Alliance_invite.query.filter_by(alliance_tag=alliance.tag).all()] 
            })
        return {
            "user": user_table,
            "players": player_profiles,
            "alliances": alliance_profiles
        }

    # delete coc account linked to user in table
    def delete_cocaccount(self,tag):
        # query table for linked accounts to user
        query = Cocaccounts.query.filter_by(user_id=self.user_id, account_tag=tag).all()
        # loop though matches and delete
        for entry in query:
            db.session.delete(entry)
            db.session.commit()

    # delete coc alliance from user tables
    def delete_cocalliance(self, tag):
        # query table to find linked rows
        query = Cocalliance.query.filter_by(alliance_tag=form["allianceTag"],user_id=form["user"]).all()
        # loop though and delete rows
        for entry in query:
            db.session.delete(entry)
            db.session.commit()








# Player table class
class Player_sql:
    
    def __init__(self, tag):
        self.tag = tag
    # return dict containing player dict
    def profile(self):
        return self.insert_or_update()
    # insert COC player data into Player table into the DB
    def insert(self, player_data):
        # varibles for defaults if player does not have them in game
        th_weapon_level = 0
        league = {}
        clan_tag = "no clan"
        clan_name = "no clan"
        labels = {}
        legend_statistics = {}
        # if statements to assign data to varibles and insert into table 
        if "townHallWeaponLevel" in player_data.keys():
            th_weapon_level = player_data["townHallWeaponLevel"]
        if "league" in player_data.keys():
            league = player_data["league"]
        if "clan" in player_data.keys():
            clan_name = player_data["clan"]["name"]
            clan_tag = player_data["clan"]["tag"]
        if "labels" in player_data.keys():
            labels = player_data["labels"]
        if "legendStatistics" in player_data.keys():
            legend_statistics = player_data["legendStatistics"]
        # create the Player class with the data from COC API
        insert_player = Player(
        tag=player_data["tag"],
        name=player_data["name"],
        town_hall_level=player_data["townHallLevel"],
        town_hall_weapon_level = th_weapon_level,
        exp_level=player_data["expLevel"],
        trophies=player_data["trophies"],
        best_trophies=player_data["bestTrophies"],
        war_stars=player_data["warStars"],
        attack_wins=player_data["attackWins"],
        defence_wins=player_data["defenseWins"],
        builder_hall_level=player_data["builderHallLevel"],
        versus_trophies=player_data["versusTrophies"],
        best_versus_trophies=player_data["bestVersusTrophies"],
        versus_battle_wins=player_data["versusBattleWins"],
        role=player_data["role"],
        donations=player_data["donations"],
        donations_received=player_data["donationsReceived"],
        clan_name = clan_name,
        clan_tag = clan_tag,
        league = league,
        legend_statistics = legend_statistics,
        achievements=player_data["achievements"], 
        labels= labels,
        troops=player_data["troops"], 
        heroes=player_data["heroes"], 
        spells=player_data["spells"])
        # Insert player into DB
        db.session.add(insert_player)
        db.session.commit()

    # Update a row in the player table
    def update(self, tag):
        # call COC api and get the current players data
        player = call_coc(tag, "players")
        # create a dict with the players data and the current time
        update_dict = dict(date_updated=datetime.utcnow(),
                tag=player["tag"],
                name=player["name"],
                town_hall_level=player["townHallLevel"],
                exp_level=player["expLevel"],
                trophies=player["trophies"],
                best_trophies=player["bestTrophies"],
                war_stars=player["warStars"],
                attack_wins=player["attackWins"],
                defence_wins=player["defenseWins"],
                builder_hall_level=player["builderHallLevel"],
                versus_trophies=player["versusTrophies"],
                best_versus_trophies=player["bestVersusTrophies"],
                versus_battle_wins=player["versusBattleWins"],
                role=player["role"],
                donations=player["donations"],
                donations_received=player["donationsReceived"],
                clan_name=player["clan"]["name"],
                clan_tag=player["clan"]["tag"],
                achievements=player["achievements"],
                labels=player["labels"],
                troops=player["troops"],
                heroes=player["heroes"],
                spells=player["spells"])
        # if player is TH12 or above enter level of TH weapon else enter 0
        if "townHallWeaponLevel" in player.keys():
            update_dict["town_hall_weapon_level"] = player["townHallWeaponLevel"]
        else:
            update_dict["town_hall_weapon_level"] = 0
        # if player is in a league enter the data else enter empty dict   
        if "league" in player.keys():
            update_dict["league"] = player["league"]
        else:
            update_dict["league"] = {}
        # if player is in a clan enter clan data else enter empty strings
        if "clan" in player.keys():
            update_dict["clan_name"] = player["clan"]["name"]
            update_dict["clan_tag"] = player["clan"]["tag"]
        else:
            update_dict["clan_name"] = ""
            update_dict["clan_tag"] = ""
        # if player has set there labels in game enter the label data else enter empty dict
        if "labels" in player.keys():
            update_dict["labels"] = player["labels"]
        else:
            update_dict["labels"] = {}
        # if the player has been in legends league in game enter the current data else enter empty dict
        if "legendStatistics" in player.keys():
            insert_player.legend_statistics = player["legendStatistics"]
        else:
            insert_player.legend_statistics = {}
        # query the database by the tag provided and update with dict created with COC data
        query = Player.query.filter_by(tag=tag).update(update_dict)
        # commit the update to the database
        db.session.commit()

    # query a player in the DB
    def query(self):
        # query the DB for one row
        query = Player.query.filter_by(tag=self.tag).first()
        # if player does not exist return NONE
        if query is None:
            return None
        # return the player data converted into a dict
        else:
            return convert_class(query)
    
    # insert new player data or update existing
    def insert_or_update(self):
        # query player, cocaccount, clanmembers tables with tag
        query = Player.query.filter_by(tag = self.tag).first()
        account_query = Cocaccounts.query.filter_by(account_tag = self.tag).first()
        clan_member_query = Clanmemberslist.query.filter_by(tag = self.tag).first()
        
        print(query,account_query,clan_member_query)
        #if player does not exist in table insert with COC API data
        if query is None :
            retrieved_data = call_coc(self.tag, "players")
            self.insert(retrieved_data)
        # if player found in table check if up to date and update if needed
        elif date_compare(query.date_updated, 0, 1, 0):
            self.update(self.tag)
        # check if account query and clan member is vaild
        if account_query is None or clan_member_query is None:
            pass
        # compare roles and if different update the cocaccounts table
        elif not account_query.role == clan_member_query.role:
            query = Cocaccounts.query.filter_by(account_tag=self.tag).update(dict(
                role=clan_member_query.role
            ))
            db.session.commit()
        # query teh table and convert to dict and return
        return self.query()










class Clan_sql:
    def __init__(self, tag):
        self.tag = tag

    def profile(self):
        # create a profile dict
        profile = {
            "details": self.insert_or_update_clan(),
            "current_war": self.insert_or_update_currentwar(),
            "war_log": self.insert_or_update_warlog(),
            "request": [convert_class(request) for request in Join_request.query.filter_by(clan_tag=self.tag).all()],
            "invite": [convert_class(invite) for invite in Alliance_invite.query.filter_by(clan_tag=self.tag).all()]
            }
        # query alliance clans table if clan is part of an alliance
        alliance = Allianceclans.query.filter_by(tag=self.tag).first()
        # if clan is part of an alliance append alliance data to profile dict
        if alliance is None:
            profile["alliance"] = {}
        else:
            profile["alliance"] = convert_class(Alliance.query.filter_by(id=alliance.alliance_id).first())
        # return clan profile dict
        return profile

    # insert into clan table
    def insert_clan(self, clan):
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
        # if clan has a location set insert else leave as empty dict
        if "location" in clan.keys():
            insert_clan.location = clan["location"]
        else:
            insert_clan.location = {}
        db.session.add(insert_clan)
        db.session.commit()
        # query clan for use of the rows ID
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

    # insert clans warlog into db
    def insert_warlog(self, log):
        insert_log = Warlog(clan_tag = self.tag, war_list = log)
        db.session.add(insert_log)
        db.session.commit()

    # insert clans current war details into db
    def insert_currentwar(self, war):
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

    # update db with clan profile
    def update_clan(self, tag):
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
 
    
    # update db with clans current war details
    def update_currentwar(self):
        # get data from COC API
        war = call_coc(self.tag, "currentwar")
        # if not in war update the state column
        if war["state"] == "notInWar":
            insert_war = Currentwar.query.filter_by(clan_tag=self.tag).update(dict(
            date_updated=datetime.utcnow(),
            state=war["state"]
            ))
            db.session.commit()
        # update current war table with COC API data
        else:
            insert_war = Currentwar.query.filter_by(clan_tag=self.tag).update(dict(
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
    
    # update clans war log details
    def update_warlog(self):
        # call COC API for warlog data
        log = call_coc(self.tag, "warlog")
        # update db with dict
        insert_log = Warlog.query.filter_by(clan_tag=self.tag).update(dict(
            date_updated=datetime.utcnow(),
            clan_tag=self.tag,
            war_list=log))
        db.session.commit()

    # query clan update or call coc api and insert if needed
    def insert_or_update_clan(self):
        # query clan table
        clan_query = Clan.query.filter_by(tag=self.tag).first()
        # if none call COC API and insert into DB
        if clan_query is None:
            retrieved_data = call_coc(self.tag, "clan")
            self.insert_clan(retrieved_data)
        # if exists compare last update date and update DB if not
        elif date_compare(clan_query.date_updated, 0, 1, 0):
            clan_data = self.update_clan(self.tag)
        else:
            # if up to date return data converted to dict
            clan_dict = convert_class(clan_query)
            # query and add members in list to clan_dict
            clan_dict["member_list"] = [convert_class(member) for member in Clanmemberslist.query.filter_by(clan_id=clan_dict["id"]).all()]
            return clan_dict
        # return the updated data as dict
        clan = convert_class(Clan.query.filter_by(tag=self.tag).first())
        clan["member_list"] = [convert_class(member) for member in Clanmemberslist.query.filter_by(clan_id=clan["id"]).all()]
        return clan

    # query current war table and if doesn't exist insert with api data fetch from COC
    def insert_or_update_currentwar(self):
        # query current war table
        query = Currentwar.query.filter_by(clan_tag=self.tag).first()
        # if does not exist call COC API and insert into DB
        if query is None:
            retrieved_data = call_coc(self.tag, 'currentwar')
            self.insert_currentwar(retrieved_data)
        # if data not up to date call COC API and update DB
        elif date_compare(query.date_updated, 0, 0, 5):
            update_currentwar(self.tag)
        return convert_class(Currentwar.query.filter_by(clan_tag=self.tag).first())
        
    # query clan warlog or call coc api and insert if needed
    def insert_or_update_warlog(self):
        # query clans warlog table
        warlog_query = Warlog.query.filter_by(clan_tag=self.tag).first()
        # if does not exist call COC API and insert into db
        if warlog_query is None:
            retrieved_data = call_coc(self.tag, "warlog")
            self.insert_warlog(retrieved_data)
        # if data not up to date update DB with COC API
        elif date_compare(warlog_query.date_updated, 0, 12, 0):
            log = self.update_warlog()
        else :
            return convert_class(warlog_query)
        return convert_class(Warlog.query.filter_by(clan_tag=self.tag).first())







class Alliance_sql:
    def __init__(self, tag):
        self.tag = tag
    
    def query_profile(self):
        clans = self.query_allianceclans()
        for clan in clans:
            clan_sql = Clan_sql(clan["tag"])
            clan["details"] = clan_sql.profile()
        return {
            "details": self.query_alliance(),
            "clans": clans,
            # complete this
            "leaders": self.query_allianceleaders(),
            "message_board": self.query_alliancemessageboard(),
            "chat": self.query_alliancechat(),

        }

    # insert into Alliance Table
    def insert_alliance(self, form):
        # create Alliance class with form data
        insert = Alliance(
            tag=form["tag"],
            name=form['name'],
            description=form['description'], 
            )
        # insert class into DB
        db.session.add(insert)
        db.session.commit()

    # insert clans into allianceclans table
    def insert_alliance_clans(self, clans_list):
        # query alliance table
        query = Alliance.query.filter_by(tag=self.tag).first()
        # verify if alliance exists if not return message
        if query is None:
            return "alliance does not exist"
        # loop though clans in list
        for clan in clans_list:
            # create class with clans data and alliance id
            insert_clan = Allianceclans(tag=clan["tag"], 
            name=clan["name"], 
            alliance_id=query.id )
            # insert into DB
            db.session.add(insert_clan)
            db.session.commit()
        return "success" 
    
    # insert into alliance leader table
    def insert_allianceleaders(self, leaders_list):
        # query alliance table
        query = Alliance.query.filter_by(tag=self.tag).first()
        # verify if alliance exists if not return message
        if query is None:
            return "alliance does not exist"
        # loop though leaders list
        for leader in leaders_list:
            # create class with leaders data
            insert = Allianceleaders(
                tag=leader["id"],
                clan_tag=leader["clanTag"],
                role=leader["role"],
                alliance_id=query.id
                )
            # insert into DB
            db.session.add(insert)
            db.session.commit()
        return "success"
    
    # insert into alliance message board table
    def insert_alliancemessageboard(self, post, user_id):
        # query alliance table
        query = Alliance.query.filter_by(tag=self.tag).first()
        # verify if alliance exists if not return message
        if query is None:
            return "alliance does not exist"
        # create class with alliance id, user id, and message body
        insert = Alliancemessageboard(
            message=post,
            posted_by=user_id,
            alliance_id=query.alliance_id )
        # insert into DB
        db.session.add(insert)
        db.session.commit()
    
    # insert into alliance chat table
    def insert_alliancechat(self, post, user_id):
         # query alliance table
        query = Alliance.query.filter_by(tag=self.tag).first()
        # verify if alliance exists if not return message
        if query is None:
            return "alliance does not exist"
        # create class with post body, alliance id, user id
        insert = Alliancechat(
            message=post,
            posted_by=user_id,
            alliance_id=query.alliance_id)
        # insert into DB
        db.session.add(insert)
        db.session.commit()

    # insert invites and requests into alliance_invite table
    def insert_alliance_invite(self, form):
        #create class with data
        insert = Alliance_invite(
            message=form["message"],
            alliance_name=form["name"],
            alliance_tag=form["tag"],
            clan_name=form["clanName"],
            clan_tag=form["clanTag"],
            sent_by=form["user"]
            )
        # insert into DB
        db.session.add(insert)
        db.session.commit()

    # insert into join request table
    def insert_join_request(self, form):
        # create class with data
        insert = Join_request(
            message=form["message"],
            alliance_name=form["name"],
            alliance_tag=form["tag"],
            clan_name=form["clanName"],
            clan_tag=form["clanTag"],
            sent_by=form["user"]
                )
        # insert into DB
        db.session.add(insert)
        db.session.commit()

    # insert or update invite
    def insert_update_alliance_invite(self, form):
        # query table to find invite
        query = Alliance_invite.query.filter_by(alliance_name=form["name"],clan_tag=form["clanTag"]).first()
        # check if invite already exists
        if query is None:
            self.insert_alliance_invite(form)
        else:
            # if already exists update table row with new data
            Alliance_invite.query.filter_by(alliance_name=form["name"],clan_tag=form["clanTag"]).update(dict(
                alliance_name=form["name"],
                alliance_tag=form["tag"],
                clan_name=form["clanName"],
                clan_tag=form["clanTag"],
                message=form["message"],
                sent_by=form["user"]
                    ))
            # update DB
            db.session.commit()
    
    # insert or update join requests table
    def insert_update_join_request(self, form):
        # query join request table
        query = Join_request.query.filter_by(alliance_name=form["name"],clan_tag=form["clanTag"]).first()
        # check if invite already exists
        if query is None:
            self.insert_join_request(form)
        else:
            # if already exists update table row with new data
            Join_request.query.filter_by(alliance_name=form["name"],clan_tag=form["clanTag"]).update(dict(
                alliance_name=form["name"],
                alliance_tag=form["tag"],
                clan_name=form["clanName"],
                clan_tag=form["clanTag"],
                message=form["message"],
                sent_by=form["user"]
                    ))
            # update DB
            db.session.commit()

    # query and return alliance table
    def query_alliance(self):
        # query and return alliance table
        return convert_class(Alliance.query.filter_by(tag=self.tag).first())
    
    # query and reutrn alliance clans
    def query_allianceclans(self):
        # query alliance table
        query = Alliance.query.filter_by(tag=self.tag).first()
        # query all clans in alliance and return in list
        return [convert_class(clan) for clan in Allianceclans.query.filter_by(alliance_id=query.id).all()] 
            
    # query and return messages linked to alliance
    def query_alliancemessageboard(self):
        # query alliance table
        query = Alliance.query.filter_by(tag=self.tag).first()
        # verify if alliance exists if not return message
        if query is None:
            return "alliance does not exist"
        # query message board table and return list of messages
        return [convert_class(message) for message in Alliancemessageboard.query.filter_by(alliance_id=query.id).all()]
    
    # query and return chat messages linked to alliance
    def query_alliancechat(self):
        # query alliance table
        query = Alliance.query.filter_by(tag=self.tag).first()
        # verify if alliance exists if not return message
        if query is None:
            return "alliance does not exist"
        # query messages and limit to 25 then return messages in a list
        return [convert_class(message) for message in Alliancechat.query.filter_by(alliance_id=alliance_id).limit(25)]

    # query join request linked to alliance
    def query_join_request(self):
        # return list of requests
        return [convert_class(request) for request in Join_request.query.filter_by(alliance_tag=self.tag).all()]
    
    # query and return invites sent by linked alliance
    def query_alliance_invite(clan_tag):
        # return list of invites
        return [convert_class(invite) for invite in Alliance_invite.query.filter_by(clan_tag=clan_tag).all()]

    # delete join request
    def delete_join_request(self, clan_tag):
        # query request
        query = Join_request.query.filter_by(alliance_tag=self.tag, clan_tag=clan_tag).first()
        # delete request from DB
        db.session.delete(query)
        db.session.commit()
    
    # delete invite
    def delete_alliance_invite(self, clan_tag):
        # query invite
        query = Alliance_invite.query.filter_by(alliance_tag=self.tag, clan_tag=clan_tag).first()
        # delete invite from DB
        db.session.delete(query)
        db.session.commit()
    
    # handle Creation of new alliance
    def create_new_alliance(self, form, user_id):
        # query DB with perposed name
        check_name = Alliance.query.filter_by(name=form["name"]).first()
        # check if name exist already
        if not check_name is None:
            return {"result": "name already exists"}
        # check clans perposed to be in alliance
        clans_already_linked = list()
        # loop though clans to check if clan is already linked to another alliance
        for clan in form["clan"]:
            check_clan = Allianceclans.query.filter_by(tag=clan["tag"]).first()
            if check_clan is None:
                continue
            else:
                clans_already_linked.append(clan["tag"])
        # if any one of the clans are already in alliance return message
        if len(clans_already_linked) > 0:
            return {"result": "clans already linked to alliance", "clans": check_clans }
        # handle the clans and leader
            # creates lists
        clan_list = list()
        # query coc accounts table for player tag
        user_account_query = Cocaccounts.query.filter_by(user_id=user_id).first()
        # query player table 
        user_player_query = Player.query.filter_by(tag=user_account_query.account_tag).first()
        # create list with dict of leader/s to be inserted into DB
        leader = [{
            "id": user_id,
            "clanTag": user_player_query.clan_tag,
            "role": "leader"
        }]
        # clan list to be inserted into table
        clan_list = list()
        # loop over clans
        for clan in form['clan']:
            # query each clan
            clan_query = Clan.query.filter_by(tag=clan['tag']).first()
            # if clan does not exist in DB insert
            if clan_query is None:
                # call COC API for clan data
                clan_data = call_coc(clan['tag'], 'clan')
                time.sleep(0.1)
                # if clan does not exist in COC API DB return Message to user
                if "reason"  in clan_data.keys():
                    return {"result": "clan does not exist", "clan": clan["tag"]}
                # append clan to clan list
                clan_list.append({
                    "tag": clan_data["tag"],
                    "name": clan_data["name"]
                    })
                # create class of clan and use insert or update method to insert into DB
                clan = Clan_sql(clan["tag"])
                clan.insert_or_update_clan()
            else:
                # append clan to clan list
                clan_list.append(convert_class(clan_query))
        # insert alliance into DB
        self.insert_alliance(form)
        # insert leader/s into leaders table
        self.insert_allianceleaders(leader)
        # insert clans into alliance clans table
        alliance_clans_status = self.insert_alliance_clans(clan_list)
        # if inserting alliance clans into table was unsuccessful return message to user
        if alliance_clans_status == "alliance does not exist":
            return {"result": "unsuccessful"}
        # if successful return message to user
        return {"result": "success"}


class Recruit_sql:
    # sql insertion functions
    def insert_post(form, user, recruitment_type):
    #insert Clanrecruitmentpost (Clan looking for members)
        if recruitment_type == 'Clan looking for members':
            insert_post = Clanrecruitmentpost(
            title=form['title'],
            recruitment_post=form['recruitmentPost'],
            clan_name=form['clanName'],
            clan_tag=form['clanTag'],
            townhall_requirement=form['townhallRequirement'],
            barbarian_king_requirement=form['BarbarianKingLevelRequirements'],
            archer_queen_requirement=form['ArcherQueenLevelRequirements'],
            grand_warden_requirement=form['GrandWardenLevelRequirements'],
            royal_champion_requirement=form['RoyalChampionLevelRequirements'],
            user_id=user
            )
            db.session.add(insert_post)
            db.session.commit()
    # insert Alliancerecruitmentpost (Alliance looking for clans & Alliance looking for Players )
        elif recruitment_type == 'Alliance looking for clans':
            insert_post = Alliancerecruitmentpost(
            title=form['title'],
            recruitment_post=form['recruitmentPost'],
            alliance_name=form['allianceName'],
            alliance_tag=form['allianceTag'],
            recruitment_type='clan',
            user_id=user
            )
            db.session.add(insert_post)
            db.session.commit()
        elif recruitment_type == 'Alliance looking for Players':
            insert_post = Alliancerecruitmentpost(
            title=form['title'],
            recruitment_post=form['recruitmentPost'],
            alliance_name=form['allianceName'],
            alliance_tag=form['allianceTag'],
            recruitment_type='player',
            user_id=user
            )
            db.session.add(insert_post)
            db.session.commit()
    # insert Clanalliancerecruitmentpost (Clan looking to join Alliance)
        elif recruitment_type == 'Clan looking to join Alliance':
            insert_post = Clanalliancerecruitmentpost(
            title=form['title'],
            recruitment_post=form['recruitmentPost'],
            clan_name=form['clanName'],
            clan_tag=form['clanTag'],
            user_id=user
            )
            db.session.add(insert_post)
            db.session.commit()
    # insert Playerrecruitmentpost (Player looking to join Clan or Alliance)
        elif recruitment_type == 'Player looking to join Clan or Alliance':
            insert_post = Playerrecruitmentpost(
            title=form['title'],
            recruitment_post=form['recruitmentPost'],
            player_name=form['playerName'],
            player_tag=form['playerTag'],
            recruitment_type=form['looking'],
            user_id=user
            )
            db.session.add(insert_post)
            db.session.commit()    

    # check if user has already made a post
    def query_post(post_type, user):
        if post_type == 'Clan looking for members':
            query = Clanrecruitmentpost.query.filter_by(user_id=user).first()
            if query is None:
                return None
            else:
                return convert_class(query)
        elif post_type == 'Alliance looking for clans':
            query = Alliancerecruitmentpost.query.filter_by(user_id=user).first()
            if query is None:
                return None
            else:
                return convert_class(query)
        elif post_type == 'Alliance looking for Players':
            query = Alliancerecruitmentpost.query.filter_by(user_id=user).first()
            if query is None:
                return None
            else:
                return convert_class(query)
        elif post_type == 'Clan looking to join Alliance':
            query = Clanalliancerecruitmentpost.query.filter_by(user_id=user).first()
            if query is None:
                return None
            else:
                return convert_class(query)
        elif post_type == 'Player looking to join Clan or Alliance':
            query = Playerrecruitmentpost.query.filter_by(user_id=user).first()
            if query is None:
                return None
            else:
                return convert_class(query)
        else:
                return None
    # fetch all posts
    def query_post_for_view(post_type):
        # query and return posts in a list according to post type
        if post_type == 'Clan looking for members':
            return [convert_class(post) for post in Clanrecruitmentpost.query.order_by('date_posted').all()]
        elif post_type == 'Alliance looking for clans':
            return [convert_class(post) for post in Alliancerecruitmentpost.query.order_by('date_posted').all()]
        elif post_type == 'Alliance looking for Players':
            return [convert_class(post) for post in Alliancerecruitmentpost.query.order_by('date_posted').all()]
        elif post_type == 'Clan looking to join Alliance':
            return [convert_class(post) for post in Clanalliancerecruitmentpost.query.order_by('date_posted').all()]
        elif post_type == 'Player looking to join Clan or Alliance':
            return [convert_class(post) for post in Playerrecruitmentpost.query.order_by('date_posted').all()]
        else:
            return {"result": "invalid form submission"}

    # sql insertion functions
    def recruitment_update_post(form, user_id, recruitment_type):
    #insert Clanrecruitmentpost (Clan looking for members)
        if recruitment_type == 'Clan looking for members':
            Clanrecruitmentpost.query.filter_by(user_id=user_id).update(dict(
            title=form['title'],
            recruitment_post=form['recruitmentPost'],
            clan_name=form['clanName'],
            clan_tag=form['clanTag'],
            townhall_requirement=form['townhallRequirement'],
            barbarian_king_requirement=form['BarbarianKingLevelRequirements'],
            archer_queen_requirement=form['ArcherQueenLevelRequirements'],
            grand_warden_requirement=form['GrandWardenLevelRequirements'],
            royal_champion_requirement=form['RoyalChampionLevelRequirements'],
            user_id=user
            ))
            db.session.commit()
    # insert Alliancerecruitmentpost (Alliance looking for clans & Alliance looking for Players )
        elif recruitment_type == 'Alliance looking for clans':
            Alliancerecruitmentpost.query.filter_by(user_id=user_id).update(dict(
            title=form['title'],
            recruitment_post=form['recruitmentPost'],
            alliance_name=form['allianceName'],
            alliance_tag=form['allianceTag'],
            recruitment_type='clan',
            user_id=user
            ))
            db.session.commit()
        elif recruitment_type == 'Alliance looking for Players':
            Alliancerecruitmentpost.query.filter_by(user_id=user_id).update(dict(
            title=form['title'],
            recruitment_post=form['recruitmentPost'],
            alliance_name=form['allianceName'],
            alliance_tag=form['allianceTag'],
            recruitment_type='player',
            user_id=user
            ))
            db.session.commit()
    # insert Clanalliancerecruitmentpost (Clan looking to join Alliance)
        elif recruitment_type == 'Clan looking to join Alliance':
            Clanalliancerecruitmentpost.query.filter_by(user_id=user_id).update(dict(
            title=form['title'],
            recruitment_post=form['recruitmentPost'],
            clan_name=form['clanName'],
            clan_tag=form['clanTag'],
            user_id=user
            ))
            db.session.commit()
    # insert Playerrecruitmentpost (Player looking to join Clan or Alliance)
        elif recruitment_type == 'Player looking to join Clan or Alliance':
            Playerrecruitmentpost.query.filter_by(user_id=user_id).update(dict(
            title=form['title'],
            recruitment_post=form['recruitmentPost'],
            player_name=form['playerName'],
            player_tag=form['playerTag'],
            recruitment_type=form['looking'],
            user_id=user
            ))
            db.session.commit()    
