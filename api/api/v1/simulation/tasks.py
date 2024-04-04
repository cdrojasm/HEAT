from .models import Simulation
from celery import shared_task, current_task
from api import db


def execute_simulation(
    simulation_id: str
):
    current_status = "FAILURE"
    status_task_object = {
        "status":"error",
        "msg":""
    }
    simulation_instance = Simulation.query.get(simulation_id)
    if simulation_instance is None:
        current_task.update_state(
            state=current_status,
            meta={**status_task_object, "msg":"Simulation not found"})
        return;
    current_status = "PROGRESS"
    current_task.update_state(
        state=current_status,
        meta={**status_task_object, "msg":"Starting simulation", "status":"ok"})
    try:
        simulation_instance.status = "running"
        db.session.commit()
    except Exception as e:
        current_task.update_state(
            state="FAILURE",
            meta={**status_task_object, "msg":"Error updating simulation status"})
        return;
    # do the simulation
    if simulation_instance.opticalHF_id != None:
        opticalHF_instance = simulation_instance.opticalHF
        current_task.update_state(
            state=current_status,
            meta={**status_task_object, "msg":"running optical heat flux", "status":"ok"})
        opticalHF_instance.run()
    if simulation_instance.photonHF_id != None:
        photonHF_instance = simulation_instance.photonHF
        current_task.update_state(
            state=current_status,
            meta={**status_task_object, "msg":"running photon heat flux", "status":"ok"})
        photonHF_instance.run()
    if simulation_instance.gyroHF_id != None:
        gyroHF_instance = simulation_instance.gyroHF
        current_task.update_state(
            state=current_status,
            meta={**status_task_object, "msg":"running gyro heat flux", "status":"ok"})
        gyroHF_instance.run()
    current_task.update_state(
        state="SUCCESS",
        meta={**status_task_object, "msg":"Simulation finished", "status":"ok"})
    return;
