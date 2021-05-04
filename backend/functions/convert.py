def convert_class(query):
    if query == None:
        return None
    x = dict()
    for attr in query.__dict__.keys():
        if attr == '_sa_instance_state':
            continue
        else:
            x[attr] = getattr(query,attr)
    return x