# convert sql query to dict
def clan_sql_dict(query):
    sql_clan = {
        "tag": query.tag,
        "name": query.name,
        "type": query.invite_type,
        "description": query.description,
        "location": query.location,
        "badgeUrls": query.badge_url,
        "clanLevel": query.clan_level,
        "clanPoints": query.clan_points,
        "clanVersusPoints": query.clan_versus_points,
        "requiredTrophies": query.required_trophies,
        "warFrequency": query.war_frequency,
        "warWinStreak": query.war_win_streak,
        "warWins": query.war_wins,
        "warTies": query.war_ties,
        "warLosses": query.war_losses,
        "isWarLogPublic": query.is_warlog_public,
        "warLeague": query.war_league,
        "members": query.member_count,
        "labels": query.labels
    }
    return sql_clan

def clan_member_sql_dict(query_list):
    sql_members = list()
    for member in query_list:
        sql_members.append({
            "tag": member.tag,
            "name": member.name,
            "role": member.role,
            "expLevel": member.exp_level,
            "league": member.league,
            "trophies": member.trophies,
            "versusTrophies": member.versus_trophies,
            "clanRank": member.clan_rank,
            "previousClanRank": member.previous_clan_rank,
            "donations": member.donations,
            "donationsReceived": member.donations_received
        })
    return sql_members

def currentwar_sql_dict(war):
    sql_war = {
        "state": war.state,
        "teamSize": war.team_size,
        "preparationStartTime": war.preparation_start_time,
        "startTime": war.start_time,
        "endTime": war.end_time,
        "clan": war.clan,
        "opponent": war.opponent
    }
    return sql_war
def warlog_sql_dict(query):
    sql_warlog = {
        "log": query.war_list
    }
    return sql_warlog