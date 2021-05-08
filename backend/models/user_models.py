from backend import db
from backend import db, login_manager
from flask_login import UserMixin
from datetime import datetime
#sqlalchemy models
from backend.model_module import *

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.String(200), primary_key=True)
    player_name = db.Column(db.String(20), unique=True, nullable=False)
    accounts = db.relationship('Accounts', backref='user', lazy=True)
    settings = db.relationship('Settings', backref='user', lazy=True)
    clan_recruitment_posts = db.relationship('Clan_recruitment_post', backref='user', lazy=True)
    player_recruitment_posts = db.relationship('Player_recruitment_post', backref='user', lazy=True)
    
    def __repr__(self):
        return f"User('{self.player_name}'"

class Settings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    web_theme = db.Column(db.String(15), default="light", nullable=False)
    user_id = db.Column(db.String(200), db.ForeignKey('user.id'))

class Accounts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    account_tag = db.Column(db.String(20), nullable=False)
    clan_tag = db.Column(db.String(20), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.String(200), db.ForeignKey('user.id'))
