
def searching(search_params, Model):
    query_filters = []
    if search_params:
        search_criteria = search_params.split(';')
        for criterion in search_criteria:
            field, operator, value = criterion.split(' ')

            if operator == '=':
                query_filters.append(getattr(Model, field) == value.strip('"'))
            elif operator == '<':
                query_filters.append(getattr(Model, field) < int(value))
            elif operator == '>':
                query_filters.append(getattr(Model, field) > int(value))
            elif operator == '<=':
                query_filters.append(getattr(Model, field) <= int(value))
            elif operator == '>=':
                query_filters.append(getattr(Model, field) >= int(value))
            elif operator == 'like':
                query_filters.append(getattr(Model, field).like(value.strip('"')))
            elif operator == 'BETWEEN':
                # search=id BETWEEN 2AND7;email like "%@email.com"
                val1, val2 = value.strip('"').split('AND')
                query_filters.append(getattr(Model, field).between(val1, val2))

    if len(query_filters) > 0:
        query_search = Model.query.filter(*query_filters)
    else:
        query_search = Model.query

    return query_search