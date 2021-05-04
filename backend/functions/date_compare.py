# datetime import
from datetime import datetime, timedelta

def date_compare(compare, day, hour, minute):
    current_date = datetime.utcnow()
    compare_date = compare + timedelta(days=day, hours=hour, minutes=minute)
    if current_date > compare_date:
        return True
    else:
        return False