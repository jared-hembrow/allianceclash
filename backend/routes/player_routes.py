from flask import Flask, request
import json
from backend import app
from backend.sql_module import query_cocaccounts,insert_or_update_player


# fetch coc profiles
@app.route('/user/coc/profile', methods=['GET'])
def coc_profile():
    user_id = request.args.get('id')
    print(user_id)
    tag_list = query_cocaccounts(user_id)
    print(tag_list)
    if tag_list is None:
        return {"result": "none"}
    profile_list = list()
    role_list = list()
    for tag in tag_list:
        data = insert_or_update_player(tag["account_tag"])
        profile_list.append(data)
        role_list.append(tag["role"])
    print(role_list)
    return {"result": "success", "content": profile_list, "role": role_list}

