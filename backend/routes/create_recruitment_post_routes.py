# flask imports
from flask import Flask, request

# libaray imports
import json
# sql Insert functions
from backend.sql_module import *

from backend import app
# create a new Recruitment post
@app.route('/api/user/recruitment/post/new', methods=["POST"])
def create_new_recruitment_post():
    user_id = request.args.get('id')
    new_post_form = json.loads(request.data.decode('utf-8'))
    print(user_id)
    print(new_post_form)
    if "type" in  new_post_form.keys():
        check = Recruit_sql.query_post(new_post_form["type"], user_id)
        if check is None:
            Recruit_sql.insert_post(new_post_form, user_id, new_post_form['type'])
            return {"result": "success"}
        else:
            Recruit_sql.update_post(new_post_form, user_id, new_post_form['type'])
            return {"result": "success"}                  
    else:
            return {"result": "invalid form submission"}



# check if user has already created a type of recruitment post
@app.route('/api/user/recruitment/post/check', methods=['GET'])
def check_for_recruitment_post():
    query_post = Recruit_sql.query_post(request.args.get('type'), request.args.get('id') )
    if query_post is None:
            return {"result": "non existing post"}
    else:
            return {"result": "existing post", "content": query_post}