
# convert sql query to dict
def recruitment_sql_dict(query, query_type):
    print(query)
    sql_dict = dict()
    if query_type == 'Clan looking for members':
        sql_dict = {
            "datePosted": query.date_posted,
            "title": query.title,
            "recruitmentPost": query.recruitment_post,
            "clanName": query.clan_name,
            "clanTag": query.clan_tag,
            "townhallRequirement": query.townhall_requirement,
            "barbarianKingRequirement": query.barbarian_king_requirement,
            "archerQueenRequirement": query.archer_queen_requirement,
            "grandWardenRequirement": query.grand_warden_requirement,
            "royalChampionRequirement": query.royal_champion_requirement,
            "userId": query.user_id,
            }
    elif query_type == 'Alliance looking for clans':
        sql_dict = {
            "datePosted": query.date_posted,
            "title": query.title,
            "recruitmentPost": query.recruitment_post,
            "allianceName": query.alliance_name,
            "allianceTag": query.alliance_tag,
            "recruitmentType": query.recruitment_type,
            "userId": query.user_id,
            }
    elif query_type == 'Alliance looking for Players':
        sql_dict = {
            "datePosted": query.date_posted,
            "title": query.title,
            "recruitmentPost": query.recruitment_post,
            "allianceName": query.alliance_name,
            "allianceTag": query.alliance_tag,
            "recruitmentType": query.recruitment_type,
            "userId": query.user_id,
            }
    elif query_type == 'Clan looking to join Alliance':
        sql_dict = {
            "datePosted": query.date_posted,
            "title": query.title,
            "recruitmentPost": query.recruitment_post,
            "clanName": query.clan_name,
            "clanTag": query.clan_tag,
            "userId": query.user_id,
            }
    elif query_type == 'Player looking to join Clan or Alliance':
        sql_dict = {
            "datePosted": query.date_posted,
            "title": query.title,
            "recruitmentPost": query.recruitment_post,
            "playerName": query.player_name,
            "playerTag": query.player_tag,
            "recruitmentType": query.recruitment_type,
            "userId": query.user_id,
            }
    else:
        return {"result": "invalid"} 
    return sql_dict