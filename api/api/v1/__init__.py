from flask import Blueprint

api_version_1_blueprint = Blueprint("v1", __name__, url_prefix="/v1")

from .user.routes import user_blueprint
from .simulation import simulation_blueprint
from .machine import machine_blueprint
from .mhd import mhd_blueprint
from .cad import cad_blueprint
from .opticalHF import HFC_blueprint
from .photonHF import photon_blueprint
from .gyroHF import gyro_blueprint
from .openFOAM import openFOAM_blueprint

api_version_1_blueprint.register_blueprint(user_blueprint)
api_version_1_blueprint.register_blueprint(simulation_blueprint)

api_version_1_blueprint.register_blueprint(machine_blueprint)
api_version_1_blueprint.register_blueprint(mhd_blueprint)
api_version_1_blueprint.register_blueprint(cad_blueprint)
api_version_1_blueprint.register_blueprint(HFC_blueprint)
api_version_1_blueprint.register_blueprint(photon_blueprint)
api_version_1_blueprint.register_blueprint(gyro_blueprint)
api_version_1_blueprint.register_blueprint(openFOAM_blueprint)





