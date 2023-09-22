from flask import request
from openapi_server.utils.constants import *
from openapi_server.services.searching import searching

def pagination_sorting(Model):
    """
    This function defines a Flask route that retrieves a 
    paginated and sorted list of the data from the database.
    It uses optional query parameters to allow the user to specify the 
    
    page number, 
    page size, 
    sorting column, and 
    sorting direction.
    
    It returns a list in JSON format with a HTTP status code of 200.

    :return: The the object.
    :rtype: list of dicts
    """

    # Retrieve pagination and sorting parameters from the query string
    page_number = request.args.get(PARAM_PAGE_NUMBER, default=pageNumber, type=int)
    page_size = request.args.get(PARAM_PAGE_SIZE, default=pageSize, type=int)
    sort_by = request.args.get(PARAM_SORT_BY, default=sortBy, type=str)
    sort_dir = request.args.get(PARAM_SORT_DIR, default=sortDir, type=str)
    
    # Determine the sorting direction based on the value of `sort_dir`
    if sort_dir == 'desc':
        sorted = getattr(Model, sort_by).desc()
    else:
        sorted = getattr(Model, sort_by).asc()
        
    # Retrieve search parameters from the query string
    search_params = request.args.get('search', type=str)

    # Build a query object based on the search parameters
    q = searching(search_params, Model)

    # Execute the query with pagination and sorting
    query = q.order_by(sorted).paginate(page=page_number, per_page=page_size)
    return query.items
