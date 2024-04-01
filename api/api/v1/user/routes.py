from . import user_blueprint
from flask_restful import Resource, Api, reqparse, fields, marshal_with
from .views import create, edit, list_, login, logout, delete

user_api_blueprint = Api(user_blueprint)

parser_user_create = reqparse.RequestParser()
parser_user_create.add_argument("username", type=str, required=True)
parser_user_create.add_argument("email", type=str, required=True)
parser_user_create.add_argument("password", type=str, required=True)

parser_user_login = reqparse.RequestParser()
parser_user_login.add_argument("email", type=str, required=False)
parser_user_login.add_argument("username", type=str, required=False)
parser_user_login.add_argument("password", type=str, required=True)

parser_user_get_user_info = reqparse.RequestParser()
parser_user_get_user_info.add_argument("user_id", type=str, required=True)

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


class User_handler_access(Resource):
    
    @marshal_with(user_object_single_response_marshall_definition)
    def post(self, action):
        args_login_user = parser_user_login.parse_args()
        username = args_login_user.username
        organization_id = args_login_user.organization_id
        email = args_login_user.email
        password = args_login_user.password
        if action == "login":
            return login(
                email=email,
                password=password,
                username=username
            )
        elif action == "logout":
            return logout(
                email=email,
                password=password,
                username=username
                
            )

class User_handler(Resource):

    @marshal_with(user_object_list_response_marshall_definition)
    def get(self):
        return list_()
    
    @marshal_with(user_object_single_response_marshall_definition)
    def post(self):
        args_create_user = parser_user_create.parse_args()
        user_args_create_dict = { key: value for key, value in args_create_user.items() if value is not None }
        return create(**user_args_create_dict)
        
    @marshal_with(user_object_single_response_marshall_definition)
    def put(self):
        args_edit_user = parser_user_create.parse_args()
        user_args_edit_dict = { key: value for key, value in args_edit_user.items() if value is not None }
        return edit(**user_args_edit_dict)
    
    @marshal_with(base_response_marshall)
    def delete(self):
        args_edit_user = parser_user_create.parse_args()
        user_args_delete_dict = { key: value for key, value in args_edit_user.items() if value is not None }
        return delete(**user_args_delete_dict)

user_api_blueprint.add_resource(User_handler, "")
user_api_blueprint.add_resource(User_handler_access, "/access/<string:action>")