# from flask_socketio import SocketIO
# from flask import current_app
# import numpy as np
# from PIL import Image
# from io import BytesIO
#
# auth = Blueprint('socket', __name__)
#
#
# @socketio.on('stream')
# def handle_stream(stream):
#     print(stream, flush=True)
#     print("!!!!!!!!!! Test", flush=True)
#
#     video_array = np.frombuffer(stream, dtype=np.uint8)
#     image = Image.open(BytesIO(video_array))
#
#     image.save('output_image.png')
#     image.close()
#
#
# @socketio.on('message')
# def handle_message(msg):
#     print('Message:', msg)
#     emit('message', msg, broadcast=True)
