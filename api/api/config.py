import os
from dotenv import load_dotenv
from datetime import timedelta

class BaseConfig:

    # load environmental variables from secrets file
    ENV_FILE_PATH_RELATIVE = ""
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

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', f'sqlite:///{BASE_DIR}/dbHEAT.sqlite3')


class DevelopmentConfig(BaseConfig):
    DEBUG=True

class ProductionConfig(BaseConfig):
    DEBUG=False

config = {
        "development":DevelopmentConfig,
        "production":ProductionConfig
        }





