from backend import db
from backend.model_module import Clanrecruitmentpost, Alliancerecruitmentpost, Clanalliancerecruitmentpost, Playerrecruitmentpost
from backend.convert_module import recruitment_sql_dict
from backend.function_module import date_compare
from datetime import datetime, timedelta

# sql insertion functions
def recruitment_insert_post(form, user, recruitment_type):
#insert Clanrecruitmentpost (Clan looking for members)
    if recruitment_type == 'Clan looking for members':
        insert_post = Clanrecruitmentpost(
        title=form['title'],
        recruitment_post=form['recruitmentPost'],
        clan_name=form['clanName'],
        clan_tag=form['clanTag'],
        townhall_requirement=form['townhallRequirement'],
        barbarian_king_requirement=form['BarbarianKingLevelRequirements'],
        archer_queen_requirement=form['ArcherQueenLevelRequirements'],
        grand_warden_requirement=form['GrandWardenLevelRequirements'],
        royal_champion_requirement=form['RoyalChampionLevelRequirements'],
        user_id=user
        )
        db.session.add(insert_post)
        db.session.commit()
# insert Alliancerecruitmentpost (Alliance looking for clans & Alliance looking for Players )
    elif recruitment_type == 'Alliance looking for clans':
        insert_post = Alliancerecruitmentpost(
        title=form['title'],
        recruitment_post=form['recruitmentPost'],
        alliance_name=form['allianceName'],
        alliance_tag=form['allianceTag'],
        recruitment_type='clan',
        user_id=user
        )
        db.session.add(insert_post)
        db.session.commit()
    elif recruitment_type == 'Alliance looking for Players':
        insert_post = Alliancerecruitmentpost(
        title=form['title'],
        recruitment_post=form['recruitmentPost'],
        alliance_name=form['allianceName'],
        alliance_tag=form['allianceTag'],
        recruitment_type='player',
        user_id=user
        )
        db.session.add(insert_post)
        db.session.commit()
# insert Clanalliancerecruitmentpost (Clan looking to join Alliance)
    elif recruitment_type == 'Clan looking to join Alliance':
        insert_post = Clanalliancerecruitmentpost(
        title=form['title'],
        recruitment_post=form['recruitmentPost'],
        clan_name=form['clanName'],
        clan_tag=form['clanTag'],
        user_id=user
        )
        db.session.add(insert_post)
        db.session.commit()
# insert Playerrecruitmentpost (Player looking to join Clan or Alliance)
    elif recruitment_type == 'Player looking to join Clan or Alliance':
        insert_post = Playerrecruitmentpost(
        title=form['title'],
        recruitment_post=form['recruitmentPost'],
        player_name=form['playerName'],
        player_tag=form['playerTag'],
        recruitment_type=form['looking'],
        user_id=user
        )
        db.session.add(insert_post)
        db.session.commit()    


# check wether a post hasn't been updated for 24 hours
def check_update_time(post):
    if date_compare(post["datePosted"],1,0,0):
        return True
    else:
        return False
# check if user has already made a post
def query_existing_post(post_type, user):
    if post_type == 'Clan looking for members':
        query = Clanrecruitmentpost.query.filter_by(user_id=user).first()
        if query is None:
            return None
        else:
            return recruitment_sql_dict(query, post_type)
    elif post_type == 'Alliance looking for clans':
        query = Alliancerecruitmentpost.query.filter_by(user_id=user).first()
        if query is None:
            return None
        else:
            return recruitment_sql_dict(query, post_type)
    elif post_type == 'Alliance looking for Players':
        query = Alliancerecruitmentpost.query.filter_by(user_id=user).first()
        if query is None:
            return None
        else:
            return recruitment_sql_dict(query, post_type)
    elif post_type == 'Clan looking to join Alliance':
        query = Clanalliancerecruitmentpost.query.filter_by(user_id=user).first()
        if query is None:
            return None
        else:
            return recruitment_sql_dict(query, post_type)
    elif post_type == 'Player looking to join Clan or Alliance':
        query = Playerrecruitmentpost.query.filter_by(user_id=user).first()
        if query is None:
            return None
        else:
            return recruitment_sql_dict(query, post_type)
    else:
            return None
# fetch all posts
def query_post_for_view(post_type):
    if post_type == 'Clan looking for members':
        query = Clanrecruitmentpost.query.order_by('date_posted').all()
        if len(query) < 1:
            return None
        else:
            recruitment_list = list()
            for post in query:
                print(post.date_posted)
                list_item = recruitment_sql_dict(post, post_type)
                recruitment_list.append(list_item)
            return recruitment_list
    elif post_type == 'Alliance looking for clans':
        query = Alliancerecruitmentpost.query.order_by('date_posted').all()
        if len(query) < 1:
            return None
        else:
            recruitment_list = list()
            for post in query:
                print(post.date_posted)
                list_item = recruitment_sql_dict(post, post_type)
                recruitment_list.append(list_item)
            return recruitment_list
    elif post_type == 'Alliance looking for Players':
        query = Alliancerecruitmentpost.query.order_by('date_posted').all()
        if len(query) < 1:
            return None
        else:
            recruitment_list = list()
            for post in query:
                print(post.date_posted)
                list_item = recruitment_sql_dict(post, post_type)
                recruitment_list.append(list_item)
            return recruitment_list
    elif post_type == 'Clan looking to join Alliance':
        query = Clanalliancerecruitmentpost.query.order_by('date_posted').all()
        if len(query) < 1:
            return None
        else:
            recruitment_list = list()
            for post in query:
                print(post.date_posted)
                list_item = recruitment_sql_dict(post, post_type)
                recruitment_list.append(list_item)
            return recruitment_list
    elif post_type == 'Player looking to join Clan or Alliance':
        query = Playerrecruitmentpost.query.order_by('date_posted').all()
        if len(query) < 1:
            return None
        else:
            recruitment_list = list()
            for post in query:
                print(post.date_posted)
                list_item = recruitment_sql_dict(post, post_type)
                recruitment_list.append(list_item)
            return recruitment_list
    else:
            return {"result": "invalid form submission"}

# sql insertion functions
def recruitment_update_post(form, user_id, recruitment_type):
#insert Clanrecruitmentpost (Clan looking for members)
    if recruitment_type == 'Clan looking for members':
        Clanrecruitmentpost.query.filter_by(user_id=user_id).update(dict(
        title=form['title'],
        recruitment_post=form['recruitmentPost'],
        clan_name=form['clanName'],
        clan_tag=form['clanTag'],
        townhall_requirement=form['townhallRequirement'],
        barbarian_king_requirement=form['BarbarianKingLevelRequirements'],
        archer_queen_requirement=form['ArcherQueenLevelRequirements'],
        grand_warden_requirement=form['GrandWardenLevelRequirements'],
        royal_champion_requirement=form['RoyalChampionLevelRequirements'],
        user_id=user
        ))
        db.session.commit()
# insert Alliancerecruitmentpost (Alliance looking for clans & Alliance looking for Players )
    elif recruitment_type == 'Alliance looking for clans':
        Alliancerecruitmentpost.query.filter_by(user_id=user_id).update(dict(
        title=form['title'],
        recruitment_post=form['recruitmentPost'],
        alliance_name=form['allianceName'],
        alliance_tag=form['allianceTag'],
        recruitment_type='clan',
        user_id=user
        ))
        db.session.commit()
    elif recruitment_type == 'Alliance looking for Players':
        Alliancerecruitmentpost.query.filter_by(user_id=user_id).update(dict(
        title=form['title'],
        recruitment_post=form['recruitmentPost'],
        alliance_name=form['allianceName'],
        alliance_tag=form['allianceTag'],
        recruitment_type='player',
        user_id=user
        ))
        db.session.commit()
# insert Clanalliancerecruitmentpost (Clan looking to join Alliance)
    elif recruitment_type == 'Clan looking to join Alliance':
        Clanalliancerecruitmentpost.query.filter_by(user_id=user_id).update(dict(
        title=form['title'],
        recruitment_post=form['recruitmentPost'],
        clan_name=form['clanName'],
        clan_tag=form['clanTag'],
        user_id=user
        ))
        db.session.commit()
# insert Playerrecruitmentpost (Player looking to join Clan or Alliance)
    elif recruitment_type == 'Player looking to join Clan or Alliance':
        Playerrecruitmentpost.query.filter_by(user_id=user_id).update(dict(
        title=form['title'],
        recruitment_post=form['recruitmentPost'],
        player_name=form['playerName'],
        player_tag=form['playerTag'],
        recruitment_type=form['looking'],
        user_id=user
        ))
        db.session.commit()    
