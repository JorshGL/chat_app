from flask import Flask
from flask_pymongo import PyMongo

def create_app():
    app = Flask(__name__)
    import config
    app.config.from_object(config)
    import auth
    app.register_blueprint(auth.bp)
    
    
    @app.route('/')
    def test():
        storage = PyMongo(app).db.users
        user = {
        "name" : "juan",
        "username" : "equisde",
        "password" : "ksjadkds"
        }
        storage.insert_one(user)
        return "done"
    return app


if __name__ == '__main__':
    create_app().run()