from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = '50ef82b874d2edbd155b60b7'


app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///database/site.db'
db = SQLAlchemy(app)
# from backend import db
# from backend.models import *(all classes you want)
# db.create_all() - to create all tables in models


bcrypt = Bcrypt(app)

# flask login manager
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'


CORS(app)
app.config['CORS_HEADERS'] = "Content-Type"
app.config['CORS_RESOURCES'] = {r"/user/*": {"origins": "*"}}

# import routes
from backend.routes import basic_routes
# user account routes
from backend.routes import user_routes

#from backend.routes.user import login_routes

#from backend.routes.coc import account_routes
# coc war routes
#from backend.routes import war_routes

# routes fro clan datea
#from backend.routes import clan_routes

# coc player routes - fetch player profile
#from backend.routes import player_routes
# alliance routes
#from backend.routes import alliance_routes
# recruitment routes
from backend.routes import create_recruitment_post_routes
from backend.routes import recruitment_post_routes
# management routes
#from backend.routes.war_management import war_management_routes
# search routes
from backend.routes import search_routes