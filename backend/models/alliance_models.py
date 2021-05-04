from backend import db
from datetime import datetime

 # Alliance Models

class Alliance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_updated = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    tag = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    clans = db.relationship('Allianceclans', backref='alliance', lazy=True)
    co_leaders = db.relationship('Allianceleaders', backref='alliance', lazy=True)
    alliance_message_board = db.relationship('Alliancemessageboard', backref='alliance', lazy=True)

class Allianceclans(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    alliance_id = db.Column(db.String(200), db.ForeignKey('alliance.id'))

class Allianceleaders(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(20), nullable=False)
    clan_tag = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    alliance_id = db.Column(db.String(200), db.ForeignKey('alliance.id'))

class Alliancemessageboard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    message = db.Column(db.String(1000), nullable=False)
    posted_by = db.Column(db.String(200), nullable=False)
    alliance_id = db.Column(db.String(200), db.ForeignKey('alliance.id'))

class Alliancechat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    message = db.Column(db.String(1000), nullable=False)
    posted_by = db.Column(db.String(200), nullable=False)
    alliance_id = db.Column(db.String(200), db.ForeignKey('alliance.id'))

# request from clan to join alliance
class Join_request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_sent = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    message = db.Column(db.String(500), nullable=False)
    alliance_name = db.Column(db.String(100), nullable=False)
    alliance_tag = db.Column(db.String(100), nullable=False)
    clan_name = db.Column(db.String(100), nullable=False)
    clan_tag = db.Column(db.String(100), nullable=False)
    sent_by = db.Column(db.String(200), nullable=False)

# invitations to clan to join Alliance
class Alliance_invite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_sent = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    message = db.Column(db.String(500), nullable=False)
    alliance_name = db.Column(db.String(100), nullable=False)
    alliance_tag = db.Column(db.String(100), nullable=False)
    clan_name = db.Column(db.String(100), nullable=False)
    clan_tag = db.Column(db.String(100), nullable=False)
    sent_by = db.Column(db.String(200), nullable=False)