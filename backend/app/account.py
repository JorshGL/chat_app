from flask import Blueprint, session
from flask_cors import cross_origin


bp = Blueprint(__name__, 'account', url_prefix='account')


@bp.route('/')
@cross_origin()
def account():
    pass