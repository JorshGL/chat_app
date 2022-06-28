from flask import Blueprint, request, abort


bp = Blueprint(__name__, 'auth', url_prefix='auth')

@bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
    except Exception:
        abort(400)
    
    
    
    
@bp.route('/login', methods=['POST'])
def login():
    pass
    

def load_user():
    pass

    
def create_unique_code():
    pass