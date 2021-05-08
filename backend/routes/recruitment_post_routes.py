# flask imports
from flask import Flask, request
# libaray imports
import json
from backend.sql_module import *

#base app imports
from backend import app
# get recruitment posts of the type request a and return them to react frontend
@app.route('/api/recruitment/post', methods=['GET'])
def get_recruitment_posts():
    print(request.args.get('type'))
    # return query of (type) table in DB
    try:
        return {
                "result": "success",
                "type": request.args.get('type'), 
                "content": Recruit_sql.query_post_for_view(request.args.get('type'))
                }
    except:
        return {"result": "unsuccessful"}

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
        