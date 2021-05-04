from backend import db
from backend.model_module import Player, Cocaccounts,Clanmemberslist
from backend.convert_module import player_sql_dict
from backend.coc_module import call_coc
from backend.function_module import date_compare, convert_class
from datetime import datetime, timedelta

# table -Player-
# insert a player profile into db
def insert_player(player):
    insert_player = Player(
        tag=player["tag"],
        name=player["name"],
        town_hall_level=player["townHallLevel"],
        town_hall_weapon_level = 0,
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
        clan_name = "",
        clan_tag = "",
        league = {},
        legend_statistics = {},
        achievements=player["achievements"], 
        labels={},
        troops=player["troops"], 
        heroes=player["heroes"], 
        spells=player["spells"])
    db.session.add(insert_player)
    db.session.commit()

# update db with player profile
def update_player(tag):
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
    # return the data from COC api
    return player

def query_player(tag):
    query = Player.query.filter_by(tag=tag).first()
    if query is None:
        return None
    else:
        return convert_class(query)

# query db if player exist then update existing otherwise call coc api and insert new player into db
def insert_or_update_player(tag):
    query = Player.query.filter_by(tag=tag).first()
    account_query = Cocaccounts.query.filter_by(account_tag=tag).first()
    clan_member_query = Clanmemberslist.query.filter_by(tag=tag).first()
    print(account_query,clan_member_query)
    player_dict = dict()
    if query is None :
        retrieved_data = call_coc(tag, "players")
        insert_player(retrieved_data)
        player_dict = retrieved_data
    elif date_compare(query.date_updated, 0, 1, 0):
        player_data = update_player(tag)
        player_dict = player_data
    else:
        player_dict = convert_class(query)
    if not account_query.role == clan_member_query.role:
        query = Cocaccounts.query.filter_by(account_tag=tag).update(dict(
            role=clan_member_query.role
        ))
        db.session.commit()
    return player_dict

