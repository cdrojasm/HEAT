from . import simulation_blueprint
from flask_restful import Resource, Api, reqparse, fields, marshal_with
from .views import create, edit, list_, delete

simulation_api_blueprint = Api(simulation_blueprint)

parser_simulation_create = reqparse.RequestParser()
parser_simulation_create.add_argument("name", type=str, required=True)
parser_simulation_create.add_argument("description", type=str, required=True)
parser_simulation_create.add_argument("user_id", type=str, required=True)

simulation_object_marshall_definition = {
    "name":fields.String
    }


user_object_marshall_definition = {
    "id":fields.String,
    "username":fields.String,
    "email":fields.String,
    "created_at":fields.DateTime,
    "updated_at":fields.DateTime,
    "last_login":fields.DateTime
}

base_response_marshall = {
    "status":fields.String,
    "msg":fields.String
}

user_object_list_response_marshall_definition = {
    **base_response_marshall,
    "data":fields.List(fields.Nested(user_object_marshall_definition))   
}

user_object_single_response_marshall_definition = {
    **base_response_marshall,
    "data":fields.Nested(user_object_marshall_definition)
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

    # get simulation components
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
        return list_()
    
    @marshal_with(user_object_single_response_marshall_definition)
    def post(self):
        args_create_user = parser_simulation_create.parse_args()
        user_args_create_dict = { key: value for key, value in args_create_user.items() if value is not None }
        return create(**user_args_create_dict)
        
    @marshal_with(user_object_single_response_marshall_definition)
    def put(self):
        args_edit_user = parser_simulation_create.parse_args()
        user_args_edit_dict = { key: value for key, value in args_edit_user.items() if value is not None }
        return edit(**user_args_edit_dict)

    @marshal_with(user_object_single_response_marshall_definition)
    def delete(self, simulation_id):
        return delete(simulation_id)

simulation_api_blueprint.add_resource(Simulation_handler, "")
simulation_api_blueprint.add_resource(Simulation_config_handler, "/config")
simulation_api_blueprint.add_resource(Simulation_actions_handler, "/actions")