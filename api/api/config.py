import os
from dotenv import load_dotenv
from datetime import timedelta

class BaseConfig:

    # load environmental variables from secrets file
    ENV_FILE_PATH_RELATIVE = ".env"
    load_dotenv(ENV_FILE_PATH_RELATIVE)
    BASE_DIR = "/app/api"
    DATA_DIR = os.path.join(BASE_DIR, "/opt/data")

    #AUTH CONFIG 
    LOGIN_MAX_TIME = timedelta(hours=4)

    # base configurations
    TESTING = os.getenv("TESTING", False)

    # DB configuration
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT")
    DB_NAME = os.getenv("DB_NAME")
    DB_TYPE = os.getenv("DB_TYPE")

    # celery broker configuration
    REDIS_CELERY_BROKER_NAME = os.getenv("DEPLOYMENT_API_BROKER_CONTAINER_NAME")
    REDIS_BROKER_URL = f"redis://{REDIS_CELERY_BROKER_NAME}:6379"
    BROKER_POOL_LIMIT = None
    BROKER_CONNECTION_RETRY = True
    BROKER_CONNECTION_RETRY_ON_STARTUP = True

    print(f"REDIS_BROKER_URL: {REDIS_BROKER_URL}")

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', f'sqlite:///{BASE_DIR}/dbHEAT.sqlite3')


class DevelopmentConfig(BaseConfig):
    DEBUG=True

class ProductionConfig(BaseConfig):
    DEBUG=False

config = {
        "development":DevelopmentConfig,
        "production":ProductionConfig
        }





