# convert sql query to dict
def player_sql_dict(query):
    #player data - create dict and place in
    sql_player = {
        "tag": query.tag,
        "name": query.name,
        "townHallLevel": query.town_hall_level,
        "expLevel": query.exp_level,
        "trophies": query.trophies,
        "bestTrophies": query.best_trophies,
        "warStars": query.war_stars,
        "attackWins": query.attack_wins,
        "defenseWins": query.defence_wins,
        "builderHallLevel": query.builder_hall_level,
        "versusTrophies": query.versus_trophies,
        "bestVersusTrophies": query.best_versus_trophies,
        "versusBattleWins": query.versus_battle_wins,
        "role": query.role,
        "donations": query.donations,
        "donationsReceived": query.donations_received,
        "achievements": query.achievements,
        "troops": query.troops,
        "heroes": query.heroes,
        "spells": query.spells
    }
    if hasattr(query, "townHallWeaponLevel"):
        sql_player["townHallWeaponLevel"] = query.town_hall_weapon_level
    if hasattr(query, "league"):
        sql_player["league"] = query.league
    else:
        sql_player["league"] = {}
    if hasattr(query, "clan_tag"):
        sql_player["clan"] = {"tag": query.clan_tag,"name": query.clan_name,}
    if hasattr(query, "labels"):      
        sql_player["labels"] = query.labels
    return sql_player 
