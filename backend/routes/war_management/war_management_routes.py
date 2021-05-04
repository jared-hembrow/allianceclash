from flask import Flask, request
from backend import app,db
# SQL
    # SQL models
from backend.models.user.user_models import Cocaccounts
    # SQL Query
from backend.sql.user_query import cocaccounts_query
    # SQL CRUD
from backend.sql.coc_crud import sql_crud_player, sql_crud_currentwar

@app.route('/management/war/clans', methods=['GET'])
def fetch_user_clans():
    user_id = request.args.get('id')
    print(user_id)
    accounts = cocaccounts_query(user_id)
    if accounts is None:
        return{"result": "no accounts linked"}
    clan_tag_list = list()
    for tag in accounts:
        player = sql_crud_player(tag)
        clan_tag_list.append(player["clan"]["tag"])
    clan_war_list = list()
    for clan in clan_tag_list:
        war_data = sql_crud_currentwar(clan)
        clan_war_list.append(war_data)
    return {"result": "success", "content": clan_war_list}
    