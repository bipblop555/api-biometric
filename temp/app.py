from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

from config import Config

app = Flask(__name__)
app.config.from_object(Config)

socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

# app.register_blueprint(app)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=True, allow_unsafe_werkzeug=True)



# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_socketio import SocketIO
# from flask_cors import CORS
# import logging
# import sys
# import numpy as np
# from PIL import Image
# from io import BytesIO
#
# sys.stdout.flush()
#
#
#
# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:password@db:3306/back?charset=utf8mb4&collation=utf8mb4_general_ci'
# socketio = SocketIO(app, cors_allowed_origins="*")  # Autorise toutes les origines pour les démonstrations, à ajuster en fonction de vos besoins
# logging.basicConfig(level=logging.DEBUG)
#
# CORS(app)

# logging.basicConfig(level=logging.DEBUG)
#
# db = SQLAlchemy(app)
# migrate = Migrate(app, db)
#
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)

# @app.route('/')
# def hello_world():
#     print('route', flush=True)
#     return 'Hello hooooo!'
#
# @socketio.on('stream')
# def handle_stream(stream):
#     print(stream, flush=True)
#     print("!!!!!!!!!! Test", flush=True)
#     app.logger.info(stream)
#     video_array = np.frombuffer(stream, dtype=np.uint8)
#
#     image = Image.open(BytesIO(video_array))
#
#     image.save('output_image.png')
#
#     image.close()
#
# if __name__ == '__main__':
#     socketio.run(app, host='0.0.0.0', debug=True, allow_unsafe_werkzeug=True)
