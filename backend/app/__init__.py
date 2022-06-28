from flask import Flask
from flask_pymongo import PyMongo

def create_app():
    app = Flask(__name__)
    import config
    app.config.from_object(config)
    import auth
    app.register_blueprint(auth.bp)
    app.config['db'] = PyMongo(app).db
    return app


if __name__ == '__main__':
    create_app().run()