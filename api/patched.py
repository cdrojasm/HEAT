from app import app
from dotenv import load_dotenv

load_dotenv("/app/.env")
INTERNAL_CONTAINER_PORT=os.getenv("INTERNAL_CONTAINER_PORT")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=INTERNAL_CONTAINER_PORT)
