from backend import db
from datetime import datetime
#sqlalchemy models
from backend.model_module import * 
 # Clan Models

class Clan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_updated = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    tag = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    invite_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    location = db.Column(db.JSON, nullable=False)
    badge_url = db.Column(db.JSON, nullable=False)
    clan_level = db.Column(db.Integer, nullable=False)
    clan_points = db.Column(db.Integer, nullable=False)
    clan_versus_points = db.Column(db.Integer, nullable=False)
    required_trophies = db.Column(db.Integer, nullable=True)
    war_frequency = db.Column(db.Integer, nullable=False)
    war_win_streak = db.Column(db.Integer, nullable=False)
    war_wins = db.Column(db.Integer, nullable=False)
    war_ties = db.Column(db.Integer, nullable=False)
    war_losses = db.Column(db.Integer, nullable=False)
    is_warlog_public = db.Column(db.Boolean, nullable=False)
    war_league = db.Column(db.JSON, nullable=True)
    member_count = db.Column(db.Integer, nullable=False)
    labels = db.Column(db.JSON, nullable=True)
    member_list = db.relationship('Clanmemberslist', backref="clan", lazy=True)
#table for members list
class Clanmemberslist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(20), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    exp_level = db.Column(db.Integer, nullable=False)
    league = db.Column(db.JSON, nullable=True)
    trophies = db.Column(db.Integer, nullable=False)
    versus_trophies = db.Column(db.Integer, nullable=False)
    clan_rank = db.Column(db.Integer, nullable=False)
    previous_clan_rank = db.Column(db.Integer, nullable=False)
    donations = db.Column(db.Integer, nullable=False)
    donations_received = db.Column(db.Integer, nullable=False)
    clan_id = db.Column(db.Integer, db.ForeignKey('clan.id'))

class Warlog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_updated = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    clan_tag = db.Column(db.String(20), nullable=False)
    war_list = db.Column(db.JSON, nullable=False)
    clan_id = db.Column(db.Integer, db.ForeignKey('clan.id'))

# current war
class Currentwar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_updated = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    state = db.Column(db.String(20), nullable=False)
    clan_tag = db.Column(db.String(20), nullable=True)
    opponent_tag = db.Column(db.String(20), nullable=True)
    team_size = db.Column(db.Integer, nullable=True)
    preparation_start_time = db.Column(db.String(50), nullable=True)
    start_time = db.Column(db.String(50), nullable=True)
    end_time = db.Column(db.String(50), nullable=True)
    clan = db.Column(db.JSON, nullable=True)
    opponent = db.Column(db.JSON, nullable=True)
    clan_id = db.Column(db.Integer, db.ForeignKey('clan.id'))

    