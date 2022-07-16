from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
import os


def create_app():
    app = Flask(__name__)
    CORS(app)
    import config
    app.config.from_object(config)
    app.config['db'] = PyMongo(app).db
    
    if not os.path.exists(app.config['UPLOADS_FOLDER']):
        os.mkdir(app.config['UPLOADS_FOLDER'])
    if not os.path.exists(app.config['PROFILE_PICS_FOLDER']):
        os.mkdir(app.config['PROFILE_PICS_FOLDER'])
    
    import auth
    app.register_blueprint(auth.bp)
    
    import users
    app.register_blueprint(users.bp)
    
    return app


if __name__ == '__main__':
    create_app().run()