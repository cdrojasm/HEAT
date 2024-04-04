from gevent import monkey
from app import app

monkey.patch_all()  # -> overwride the standard python library to implement async

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
