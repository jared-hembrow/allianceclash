from backend.model_module import *
from backend.function_module import *


def search_clan(term):
    clan_query = Clan.query.filter(db.text("~ :reg")).params(reg=term).limit(25)
    clan_list = list()
    for clan in clan_query:
        clan_dict = convert_class(clan)
        clan_dict["warLog"] = convert_class(Warlog.query.filter_by(clan_tag=clan.tag).first())
        clan_list.append(clan_dict)
    return clan_list

def search_player(term):
    player_query = Player.query.filter(db.text("~ :reg")).params(reg=term).limit(25)
    player_list = list()
    for player in player_query:
        player_list.append(convert_class(player))
    return player_list