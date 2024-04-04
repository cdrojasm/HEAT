import os
from flask import Flask, Blueprint
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from .config import config
from flask_restful import Api
from flask_celeryext import FlaskCeleryExt
from api.celery_utils import make_celery

db = SQLAlchemy()
migrate = Migrate()
api_blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(api_blueprint)
ext_celery = FlaskCeleryExt(create_celery_app=make_celery)

def create_app(config_name=None):
    if config_name == None:
        config_name = os.environ.get("FLASK_CONFIG", "development")

    # start app instance
    app = Flask(__name__)

    # set configuration from config object 
    app.config.from_object(config[config_name])

    # set up extensions
    db.init_app(app)
    migrate.init_app(app, db)
    ext_celery.init_app(app)

    # register blueprints
    from .v1 import api_version_1_blueprint
    api_blueprint.register_blueprint(api_version_1_blueprint)
    app.register_blueprint(api_version_1_blueprint)

    with app.app_context():
        create_records = False
        if not os.path.isfile("dbHEAT.sqlite3"):
            create_records = True
            db.create_all()

    @app.shell_context_processor
    def ctx():
        return {
                "app":app,
                "db":db
                }

    print("starting API", flush=True)
    print("sitemap:", flush=True)
    print("app.url_map", flush=True)
    print(app.url_map, flush=True)

    return app


