# module imports
from flask import Flask, request, send_from_directory
from flask_login import login_user, current_user, logout_user, login_required
import json

#backend imports
from backend import app, db, bcrypt
#sqlalchemy models
from backend.models.user.user_models import User, Settings 
# helper functions
from backend.sql.convert_dict.convert_user import settings_sql_dict

#log in route
@app.route('/user/login', methods=['POST'])
def login():
    incoming_data = request.data.decode('utf-8')
    login_form = json.loads(incoming_data)
    user = User.query.filter_by(email=login_form["Email"]).first()
    if user is None:
        print("failure to log in")
        return {"result": "User does not exist"}
    if bcrypt.check_password_hash(user.password, login_form["Password"]):
        login_user(user)
        get_settings = Settings.query.filter_by(user_id=current_user.id).first()
        settings = settings_sql_dict(get_settings)
        print("logged in")
        return {"result": "success", "user": {"id": current_user.id, "playername": user.playername, "email": user.email, "displaypicture": user.display_picture, "settings": settings}}
    else:
        return {"result": "Incorrect Password"}
# log out route
@app.route('/user/logout', methods=['GET'])
def logout():
    logout_user()
    return {"result": "logged out"}
# check currently logged in
@app.route('/user/current', methods=['GET'])
def current_logged_in_user():
    if current_user.is_authenticated:
        get_settings = Settings.query.filter_by(user_id=current_user.id).first()
        settings = settings_sql_dict(get_settings)
        return {"result": "User logged in", "user": { "id": current_user.id , "playername": current_user.playername, "email": current_user.email,"displaypicture": current_user.display_picture, "settings": settings}}
    else:
        return {"result" : "User not logged in"}