from backend.model_module import *
from backend.convert_module import (
    alliance_sql_dict,
    allianceclans_sql_dict,
    clan_sql_dict,
    warlog_sql_dict,
    player_sql_dict
)
def search_alliance(term):
    alliance_query = Alliance.query.filter(db.text("~ :reg")).params(reg=term).limit(25)
    alliance_list = list()
    for alliance in alliance_query:
        alliance_dict = alliance_sql_dict(alliance)
        alliance_dict["clans"] = []
        clans_query = Allianceclans.query.filter_by(alliance_id=alliance.id).all()
        for clan in clans_query:
            alliance_dict["clans"].append(allianceclans_sql_dict(clan))
        print(alliance.name)
        alliance_list.append(alliance_dict)
    return alliance_list

def search_clan(term):
    clan_query = Clan.query.filter(db.text("~ :reg")).params(reg=term).limit(25)
    clan_list = list()
    for clan in clan_query:
        clan_dict = clan_sql_dict(clan)
        clan_dict["warLog"] = warlog_sql_dict(Warlog.query.filter_by(clan_tag=clan.tag).first())
        clan_list.append(clan_dict)
    return clan_list

def search_player(term):
    player_query = Player.query.filter(db.text("~ :reg")).params(reg=term).limit(25)
    player_list = list()
    for player in player_query:
        player_list.append(player_sql_dict(player))
    return player_list