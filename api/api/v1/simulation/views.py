import uuid
import datetime

from sqlalchemy import and_

from .models import Simulation
from ..user.models import User

from ..machine.models import Machine
from ..mhd.models import MHD
from ..cad.models import CAD
from ..opticalHF.models import OpticalHF
from ..photonHF.models import PhotonHF
from ..gyroHF.models import GyroHF
from ..openFOAM.models import OpenFOAM

from api import db

from .utils import create_simulation_path, remove_simulation_path
from .tasks import execute_simulation



# crud operations

def list_(
        user_id: str,
        limit: int = None,
        offset: int = None,
        order_by: str = None,
        order: str = None,
        q_filter: str = None
):
    if limit is None:
        limit = 10
    if offset is None:
        offset = 0
    if order_by is None:
        order_by = "created_at"
    else:
        order_by = order_by
    if order is None:
        order = "desc"
    if q_filter is None:
        q_filter = ""
    try:
        simulation_instance_list = db.session.query(Simulation)\
            .filter(Simulation.user_id == user_id) \
            .filter(Simulation.name.like(f"%{q_filter}%")) \
            .order_by(getattr(Simulation, order_by).asc() if order == 'asc' else getattr(Simulation, order_by).desc()) \
            .limit(limit) \
            .offset(offset) \
            .all()
    except Exception as e:
        print(e, flush=True)
        return {
            "status": "error",
            "msg": str(e)
        }, 500
    return {
        "status": "success",
        "msg": "Simulations listed",
        "data": [simulation.as_dict() for simulation in simulation_instance_list]
    }, 200

def create(
    name: str,
    description: str,
    user_id: str
):
    user_instance = User.query.get(user_id)
    if user_instance is None:
        return {
            "status": "error",
            "msg": "User not found"
        }, 400
    simulation_id = str(uuid.uuid4())
    try:
        simulation_path = create_simulation_path(
            simulation_id=simulation_id,
            user_id=user_id
        )
    except Exception as e:
        return {
            "status": "error",
            "msg": f"error during simulation path creation {str(e)}"
        }, 500
    try:
        simulation_instance = Simulation(
            id=simulation_id,
            name=name,
            description=description,
            user_id=user_id,
            path=simulation_path,
            created_at=datetime.datetime.now(),
            edited_at=datetime.datetime.now()
        )
        db.session.add(simulation_instance)
        db.session.commit()
    except Exception as e:
        remove_simulation_path(
            simulation_id=simulation_id,
            user_id=user_id)
        return {
            "status": "error",
            "msg": f"error during simulation object commit in db -> {str(e)}"
        }, 500

    return {
        "status": "success",
        "msg": "Simulation created",
        "data": simulation_instance.as_dict()
    }, 200

def edit(
    simulation_id: str,
    name: str,
    description: str
):
    simulation_instance = Simulation.query.get(simulation_id)
    if simulation_instance is None:
        return {
            "status": "error",
            "msg": "Simulation not found"
        }, 400
    simulation_instance.name = name
    simulation_instance.description = description
    simulation_instance.edited_at = datetime.datetime.now()
    try:
        db.session.commit()
    except Exception as e:
        return {
            "status": "error",
            "msg": str(e)
        }, 500
    return {
        "status": "success",
        "msg": "Simulation updated",
        "data": simulation_instance.as_dict()
    }, 200


def delete(
        simulation_id: str
):
    simulation_instance = Simulation.query.get(simulation_id)
    if simulation_instance is None:
        return {
            "status": "error",
            "msg": "Simulation not found"
        }, 400
    user_id = simulation_instance.user_id 
    try:
        remove_simulation_path(
            simulation_id=simulation_id,
            user_id=user_id
        )
    except Exception as e:
        return {
            "status": "error removing simulation path",
            "msg": str(e)
        }, 500
    try:
        db.session.delete(simulation_instance)
        db.session.commit()
    except Exception as e:
        return {
            "status": "error",
            "msg": str(e)
        }, 500
    
    return {
        "status": "success",
        "msg": "Simulation deleted"
    }, 200

def vinculate_simulation_component(
    simulation_component_id: str,
    simulation_id: str,
    component_type: str
):
    simulation_instance = Simulation.query.get(simulation_id)
    if simulation_instance is None:
        return {
            "status": "error",
            "msg": "Simulation not found"
        }, 400
    if component_type == "machine":
        component_instance = Machine.query.get(simulation_component_id)
        simulation_instance.machine_id = simulation_component_id
    elif component_type == "mhd":
        component_instance = MHD.query.get(simulation_component_id)
        simulation_instance.mhd_id = simulation_component_id
    elif component_type == "cad":
        component_instance = CAD.query.get(simulation_component_id)
        simulation_instance.cad_id = simulation_component_id
    elif component_type == "opticalHF":
        component_instance = OpticalHF.query.get(simulation_component_id)
        simulation_instance.opticalHF_id = simulation_component_id
    elif component_type == "photonHF":
        component_instance = PhotonHF.query.get(simulation_component_id)
        simulation_instance.photonHF_id = simulation_component_id
    elif component_type == "gyroHF":
        component_instance = GyroHF.query.get(simulation_component_id)
        simulation_instance.gyroHF_id = simulation_component_id
    elif component_type == "openFOAM":
        component_instance = OpenFOAM.query.get(simulation_component_id)
        simulation_instance.openFOAM_id = simulation_component_id
    else:
        return {
            "status": "error",
            "msg": "Component type not found"
        }, 400
    if component_instance is None:
        return {
            "status": "error",
            "msg": f"It not exist a Component with the provided id {simulation_component_id} to the type {component_type}"
        }, 400
    try:
        simulation_instance.edited_at = datetime.datetime.now()
        db.session.commit()
    except Exception as e:
        return {
            "status": "error",
            "msg": str(e)
        }, 500
    return {
        "status": "success",
        "msg": "Component vinculated to simulation"
    }, 200

def devinculate_simulation_component(
    simulation_id: str,
    component_type: str
):
    simulation_instance = Simulation.query.get(simulation_id)
    if simulation_instance is None:
        return {
            "status": "error",
            "msg": "Simulation not found"
        }, 400
    component_to_devinculate = None
    if component_type == "machine":
        component_to_devinculate = simulation_instance.machine
        simulation_instance.machine_id = None
    elif component_type == "mhd":
        component_to_devinculate = simulation_instance.mhd
        simulation_instance.mhd_id = None
    elif component_type == "cad":
        component_to_devinculate = simulation_instance.cad
        simulation_instance.cad_id = None
    elif component_type == "opticalHF":
        component_to_devinculate = simulation_instance.opticalHF
        simulation_instance.opticalHF_id = None
    elif component_type == "photonHF":
        component_to_devinculate = simulation_instance.photonHF
        simulation_instance.photonHF_id = None
    elif component_type == "gyroHF":
        component_to_devinculate = simulation_instance.gyroHF
        simulation_instance.gyroHF_id = None
    elif component_type == "openFOAM":
        component_to_devinculate = simulation_instance.openFOAM
        simulation_instance.openFOAM_id = None
    else:
        return {
            "status": "error",
            "msg": "Component type not found"
        }, 400
    if component_to_devinculate is None:
        return {
            "status": "error",
            "msg": f"This simulation has no vinculated component of type {component_type}"
        }, 400
    try:
        simulation_instance.edited_at = datetime.datetime.now()
        db.session.delete(component_to_devinculate)
        db.session.commit()
    except Exception as e:
        return {
            "status": "error",
            "msg": str(e)
        }, 500
    return {
        "status": "success",
        "msg": "Component devinculated to simulation"
    }, 200

def get_simulation_info(
    simulation_id: str
):
    simulation_instance = Simulation.query.get(simulation_id)
    if simulation_instance is None:
        return {
            "status": "error",
            "msg": "Simulation not found"
        }, 400
    return {
        "status": "success",
        "msg": "Simulation info",
        "data": simulation_instance.as_dict()
    }, 200

def run_simulation(
    simulation_id: str
):
    simulation_instance = Simulation.query.get(simulation_id)
    if simulation_instance is None:
        return {
            "status": "error",
            "msg": "Simulation not found"
        }, 400
    if simulation_instance.status == "running":
        return {
            "status": "error",
            "msg": "Simulation already running"
        }, 400
    if simulation_instance.status == "non-checked":
        return {
            "status": "error",
            "msg": "Simulation has not been checked"
        }, 400
    task = execute_simulation.apply_async(
        args=(simulation_id,)
    )
    task_id = task.id
    return {
        "status": "success",
        "msg": "Simulation running",
        "data": {
            "task_id": task_id
        }
    }, 200
    
    