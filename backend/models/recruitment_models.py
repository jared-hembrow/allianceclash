from backend import db
from datetime import datetime

# table for advertiseing for players to join clan
class Clanrecruitmentpost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    title = db.Column(db.String(100), nullable=False)
    recruitment_post = db.Column(db.String(1000), nullable=False)
    clan_name = db.Column(db.String(50), nullable=False)
    clan_tag = db.Column(db.String(20), nullable=False)
    townhall_requirement = db.Column(db.Integer, nullable=False)
    barbarian_king_requirement = db.Column(db.Integer, nullable=False)
    archer_queen_requirement = db.Column(db.Integer, nullable=False)
    grand_warden_requirement = db.Column(db.Integer, nullable=False)
    royal_champion_requirement = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.String(200), db.ForeignKey('user.id'))
# table for advertising for clans or players to join alliance
class Alliancerecruitmentpost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    title = db.Column(db.String(100), nullable=False)
    recruitment_post = db.Column(db.String(1000), nullable=False)
    alliance_name = db.Column(db.String(50), nullable=False)
    alliance_tag = db.Column(db.String(20), nullable=False)
    recruitment_type = db.Column(db.String(30), nullable=False)
    user_id = db.Column(db.String(200), db.ForeignKey('user.id'))
# table for advertising for a clan who wants to join an alliance
class Clanalliancerecruitmentpost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    title = db.Column(db.String(100), nullable=False)
    recruitment_post = db.Column(db.String(1000), nullable=False)
    clan_name = db.Column(db.String(50), nullable=False)
    clan_tag = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.String(200), db.ForeignKey('user.id'))
# table for advertising for a player who wants to join a clan or alliance
class Playerrecruitmentpost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    title = db.Column(db.String(100), nullable=False)
    recruitment_post = db.Column(db.String(1000), nullable=False)
    player_name = db.Column(db.String(50), nullable=False)
    player_tag = db.Column(db.String(20), nullable=False)
    recruitment_type = db.Column(db.String(30), nullable=False)
    user_id = db.Column(db.String(200), db.ForeignKey('user.id'))