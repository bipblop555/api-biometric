from flask import Blueprint
from flask_socketio import emit, SocketIO
import numpy as np
from PIL import Image
from io import BytesIO
from src import db, socketio
import cv2
import face_recognition
import json
import ast

auth_bp = Blueprint('auth', __name__)


@socketio.on('login')
def register(stream):
    frame_analyser = False

    facial_recognition = FacialRecognition()

    from src.models.User import User

    user = User.query.filter_by(username=stream[0]).first()

    unknown_biometric_facial = facial_recognition.execute(stream[1])

    biometric_key_str = user.biometric_key.decode('utf-8')

    biometric_key_list = ast.literal_eval(biometric_key_str)

    if unknown_biometric_facial is not False:
        frame_analyser = facial_recognition.compare_biometric_facial(unknown_biometric_facial, [biometric_key_list])

    face_cascade = cv2.CascadeClassifier('/Backend/src/haarcascade/haarcascade_frontalface_default.xml')

    face_position = FrameVideoAnalyse(face_cascade, stream[1]).detect_face_position()

    emit('login', json.dumps({
        'data': {
            'attributes': {
                'face_position': face_position,
                'face_match': frame_analyser
            }
        }
    }))

    print('finished', flush=True)


@socketio.on('register')
def handle_stream(stream):
    facial_recognition = FacialRecognition()

    unknown_biometric_facial = facial_recognition.execute(stream[1])

    from src.models.User import User
    biometric_key_str = json.dumps(unknown_biometric_facial.tolist())

    new_user = User(username=stream[0], biometric_key=biometric_key_str)
    db.session.add(new_user)
    db.session.commit()

    emit('register', {
        'data': {
            'attributes': {
                'success': True
            }
        }
    })


def serialize_data(data):
    if isinstance(data, bool):
        return data
    elif hasattr(data, 'tolist') and callable(getattr(data, 'tolist')):
        return data.tolist()
    else:
        return str(data)


class FacialRecognition:

    def __init__(self):
        pass

    def execute(self, stream):
        unknown_facial = face_recognition.load_image_file(BytesIO(stream))
        unknown_biometric_facial = face_recognition.face_encodings(unknown_facial)
        if len(unknown_biometric_facial) > 0:
            return unknown_biometric_facial[ 0 ]

        return False

    def compare_biometric_facial(self, unknown_biometric_facial, known_biometric_facial):
        if len(unknown_biometric_facial) > 0 and len(known_biometric_facial) > 0:
            return True if face_recognition.compare_faces(known_biometric_facial, unknown_biometric_facial) else False

        return False


class FrameVideoAnalyse:
    def __init__(self, face_cascade, frame):
        self.frame = face_cascade.detectMultiScale(bytes_to_image(frame), 1.3, 5)

    def detect_face_position(self):
        face = self.frame
        if len(face) > 0:
            for (x, y, w, h) in face:
                return int(x), int(w), int(y), int(h)
        return []


def bytes_to_image(byte_data):
    image = Image.open(BytesIO(byte_data))
    return cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)
