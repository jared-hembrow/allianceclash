# flask imports
from flask import Flask, request

# libaray imports
import json
# sql Insert functions
from backend.sql_module import recruitment_insert_post, recruitment_update_post, query_existing_post, check_update_time

from backend import app
# create a new Recruitment post
@app.route('/user/recruitment/post/new', methods=["POST"])
def create_new_recruitment_post():
    user_id = request.args.get('id')
    incoming_data = request.data.decode('utf-8')
    new_post_form = json.loads(incoming_data)
    print(user_id)
    print(new_post_form)
    if "type" in  new_post_form.keys():
        check = query_existing_post(new_post_form["type"], user_id)
        if check is None:
            recruitment_insert_post(new_post_form, user_id, new_post_form['type'])
            return {"result": "success"}
        else:
            print(check)
            if check_update_time(check) is True:
                recruitment_update_post(new_post_form, user_id, new_post_form['type'])
                return {"result": "success"}
            else:
                return {"result": "cannot post"}
            
    else:
            return {"result": "invalid form submission"}



# check if user has already created a type of recruitment post
@app.route('/user/recruitment/post/check', methods=['GET'])
def check_for_recruitment_post():
    user_id = request.args.get('id')
    post_type = request.args.get('type')
    check = query_existing_post(post_type, user_id)
    if check is None:
            return {"result": "non existing post"}
    else:
            return {"result": "existing post", "content": check}