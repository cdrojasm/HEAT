from flask import current_app
import os

def create_simulation_path(
    simulation_id:str,
    user_id:str
):
    data_dir = current_app.config.get("DATA_DIR")
    simulation_path_str = os.path.join(data_dir, user_id, simulation_id)
    if not os.path.exists(simulation_path_str):
        os.makedirs(simulation_path_str)
    return simulation_path_str


def remove_simulation_path(
    simulation_id:str,
    user_id:str
):
    data_dir = current_app.config.get("DATA_DIR")
    simulation_path_str = os.path.join(data_dir, user_id, simulation_id)
    if os.path.exists(simulation_path_str):
        os.rmdir(simulation_path_str)
    return simulation_path_str