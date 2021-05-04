def user_sql_dict(query):
    sql_user = {
        "id": query.id,
        "playerName": query.player_name,

    }
    return sql_user
def settings_sql_dict(query):
    sql_settings = {
        "id": query.user_id,
        "webTheme": query.web_theme,

    }
    return sql_settings