from flask import Flask

def create_app():
    app = Flask(__name__)
    import config
    app.config.from_object(config)
    return app


if __name__ == '__main__':
    create_app().run()