from src import create_app, socketio

app = create_app()
print('route', flush=True)

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', debug=True, allow_unsafe_werkzeug=True)