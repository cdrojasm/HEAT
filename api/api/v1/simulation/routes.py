from . import simulation_blueprint
from flask_restful import Resource, Api, reqparse, fields, marshal_with
from .views import create, edit, list_, delete
from flask import request

simulation_api_blueprint = Api(simulation_blueprint)

parser_simulation_create = reqparse.RequestParser()
parser_simulation_create.add_argument("user_id", type=str, required=True)
parser_simulation_create.add_argument("name", type=str, required=True)
parser_simulation_create.add_argument("description", type=str, required=True)

parser_simulation_edit = reqparse.RequestParser()
parser_simulation_edit.add_argument("simulation_id", type=str, required=True)
parser_simulation_edit.add_argument("name", type=str, required=False)
parser_simulation_edit.add_argument("description", type=str, required=False)

parser_simulation_delete = reqparse.RequestParser()
parser_simulation_delete.add_argument("simulation_id", type=str, required=True)


simulation_object_marshall_definition = {
    "name":fields.String
    }

user_object_marshall_definition_basic = {
    "id":fields.String,
    "user_id":fields.String,
    "name":fields.String,
    "description":fields.String,
    "path":fields.String,
    "created_at":fields.DateTime,
    "edited_at":fields.DateTime,
    "last_run":fields.DateTime
}

base_response_marshall = {
    "status":fields.String,
    "msg":fields.String
}

user_object_list_response_marshall_definition = {
    **base_response_marshall,
    "data":fields.List(fields.Nested(user_object_marshall_definition_basic))   
}

user_object_single_response_marshall_definition = {
    **base_response_marshall,
    "data":fields.Nested(user_object_marshall_definition_basic)
}

class Simulation_actions_handler(Resource):

    # run simulation
    @marshal_with(user_object_single_response_marshall_definition)
    def post(self, action):
        pass

    # check simulation status
    @marshal_with(user_object_single_response_marshall_definition)
    def get(self, action):
        pass

    # get simulation results
    @marshal_with(user_object_single_response_marshall_definition)
    def get(self, action):
        pass

    # stop simulation
    @marshal_with(user_object_single_response_marshall_definition)
    def delete(self, action):
        pass


class Simulation_config_handler(Resource):

    # vinculate simulation component
    @marshal_with(user_object_single_response_marshall_definition)
    def post(self, action):
        pass

    # devinculate simulation component
    @marshal_with(user_object_single_response_marshall_definition)
    def delete(self, action):
        pass

    # get simulation info
    @marshal_with(user_object_single_response_marshall_definition)
    def get(self, action):
        pass

    # set simulation component
    @marshal_with(user_object_single_response_marshall_definition)
    def put(self, action):
        pass


class Simulation_handler(Resource):

    @marshal_with(user_object_list_response_marshall_definition)
    def get(self):
        user_id = request.args.get("user_id")
        limit = request.args.get("limit")
        offset = request.args.get("offset")
        order_by = request.args.get("order_by")
        order = request.args.get("order")
        q_filter = request.args.get("q_filter")
        return list_(
            user_id=user_id,
            limit=limit,
            offset=offset,
            order_by=order_by,
            order=order,
            q_filter=q_filter
        )
    
    @marshal_with(user_object_single_response_marshall_definition)
    def post(self):
        args_create_user = parser_simulation_create.parse_args()
        user_args_create_dict = { key: value for key, value in args_create_user.items() if value is not None }
        return create(**user_args_create_dict)
        
    @marshal_with(user_object_single_response_marshall_definition)
    def put(self):
        args_edit_user = parser_simulation_edit.parse_args()
        user_args_edit_dict = { key: value for key, value in args_edit_user.items() if value is not None }
        return edit(**user_args_edit_dict)

    @marshal_with(base_response_marshall)
    def delete(self):
        args_delete_user = parser_simulation_delete.parse_args()
        simulation_id = args_delete_user.simulation_id
        return delete(simulation_id)

simulation_api_blueprint.add_resource(Simulation_handler, "")
simulation_api_blueprint.add_resource(Simulation_config_handler, "/config")
simulation_api_blueprint.add_resource(Simulation_actions_handler, "/actions")