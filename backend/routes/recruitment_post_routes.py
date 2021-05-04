# flask imports
from flask import Flask, request
# libaray imports
import json
from backend.sql_module import (
    recruitment_insert_post,
    query_existing_post,
    query_post_for_view,
    query_cocaccounts,
    query_player
    )

#base app imports
from backend import app

@app.route('/recruitment/post', methods=['GET'])
def get_recruitment_posts():
    post_type = request.args.get('type')
    print(post_type)
    query_dict = query_post_for_view(post_type)
    
    return {"result": "success", "type": post_type, "content": query_dict}

@app.route('/recruitment/clanlist', methods=["GET"])
def get_user_clanlist():
    user_id = request.args.get('id')
    print(user_id)
    user_accounts = query_cocaccounts(user_id)
    if user_accounts is None:
        return {"result": "no accounts linked"}
    clan_list = list()
    for account in user_accounts:
        query = query_player(account["tag"])
        if query is None:
            continue
        else:
            clan_list.append({
                "name":query["clan"]["name"],
                "tag": query["clan"]["tag"]
                })
    return {"result": "success", "content": clan_list}
        