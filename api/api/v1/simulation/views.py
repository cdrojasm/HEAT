import datetime
from .models import Simulation
from ..user.models import User
from api import db
import uuid
from .utils import create_simulation_path, remove_simulation_path
from sqlalchemy import and_


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
    user_id = simulation_instance.user_id 
    if simulation_instance is None:
        return {
            "status": "error",
            "msg": "Simulation not found"
        }, 400
    try:
        db.session.delete(simulation_instance)
        db.session.commit()
    except Exception as e:
        return {
            "status": "error",
            "msg": str(e)
        }, 500
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
    return {
        "status": "success",
        "msg": "Simulation deleted"
    }, 200



