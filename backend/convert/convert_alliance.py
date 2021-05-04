def alliance_sql_dict(query):
    return {
        "id": query.id,
        "tag": query.tag,
        "name": query.name,
        "description": query.description,
            }

def allianceclans_sql_dict(query):
    return {
        "tag": query.tag,
        "name": query.name,
    }
def allianceleaders_sql_dict(query):
    return {
        "tag": query.tag,
        "role": query.role
    }
def alliancemessageboard_sql_dict(query):
    return {
        "id": query.id,
        "datePosted": query.date_posted,
        "message": query.message,
        "postedBy": query.posted_by

    }
def alliancechat_sql_dict(query):
    return {
        "id": query.id,
        "datePosted": query.date_posted,
        "message": query.message,
        "postedBy": query.posted_by

    }
def join_request_sql_dict(query):
    return {
        "dateSent": query.date_sent,
        "message": query.message,
        "allianceName": query.alliance_name,
        "allianceTag": query.alliance_tag,
        "clanName": query.clan_name,
        "clanTag": query.clan_tag,
        "sentBy": query.sent_by
    }
def alliance_invite_sql_dict(query):
    return {
        "dateSent": query.date_sent,
        "message": query.message,
        "allianceName": query.alliance_name,
        "allianceTag": query.alliance_tag,
        "clanName": query.clan_name,
        "clanTag": query.clan_tag,
        "sentBy": query.sent_by
    }