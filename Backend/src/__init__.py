from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from config import Config
from flask_cors import CORS
from flask_migrate import Migrate
from flask_caching import Cache


db = SQLAlchemy()
socketio = SocketIO()

def create_app(config_class=Config):
    app = Flask(__name__)

    app.config.from_object(config_class)
    CORS(app)

    db.init_app(app)
    socketio.init_app(app, cors_allowed_origins="*")

    Migrate(app, db)

    from src.controllers import auth_controller
    app.register_blueprint(auth_controller.auth_bp)

    return app
