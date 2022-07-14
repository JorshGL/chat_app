from flask import Blueprint, session, current_app, request, Response
from json import dumps
from bson import json_utils
from flask_cors import cross_origin


bp = Blueprint(__name__, 'account', url_prefix='/me')


@bp.route('/', methods=['GET', 'PATCH'])
@cross_origin()
def account():
    user_id = session.get('user_id')
    storage = current_app.config['db'].users
    user = storage.find_one({'_id' : user_id})
    
    if request.method == 'GET':
        return Response(request)