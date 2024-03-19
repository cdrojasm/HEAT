from . import user_blueprint
from flask_restful import Resource, Api, reqparse, fields, marshal_with
from flask_jwt_extended import jwt_required
from .views import signin, login, logout, edit, signout, list, refresh, get_user_permissions, check_recovery_question, generate_recovery_key, change_password, set_recovery_question, get_user_info, check_user_has_recovery_question, administrator_password_reset

user_api_blueprint = Api(user_blueprint)

parser_user_signin = reqparse.RequestParser()
parser_user_signin.add_argument("username", type=str, required=True)
parser_user_signin.add_argument("email", type=str, required=True)
parser_user_signin.add_argument("password", type=str, required=True)
parser_user_signin.add_argument("organization_id", type=str, required=True)
parser_user_signin.add_argument("group_id", type=str, required=True)
parser_user_signin.add_argument("rol_id", type=str, required=True)

parser_user_login = reqparse.RequestParser()
parser_user_login.add_argument("email", type=str, required=False)
parser_user_login.add_argument("username", type=str, required=False)
parser_user_login.add_argument("password", type=str, required=True)
parser_user_login.add_argument("organization_id", type=str, required=True)

parser_user_get_user_info = reqparse.RequestParser()
parser_user_get_user_info.add_argument("user_id", type=str, required=True)

permission_object_marshall_definition = {
    "id":fields.String,
    "group":fields.Nested({
        "id":fields.String,
        "name":fields.String,
        }) ,
    "rol":fields.Nested({
        "id":fields.String,
        "type":fields.String,
        "value":fields.String,
        "description":fields.String
    })    
}

user_object_marshall_definition = {
    "id":fields.String,
    "username":fields.String,
    "email":fields.String,
    "organization_id":fields.String,
    "created_at":fields.DateTime,
    "edited_at":fields.DateTime,
    "ldap":fields.Boolean
}

base_response_marshall = {
    "status":fields.String,
    "msg":fields.String
}

user_object_list_marshall_definition = {
    **base_response_marshall,
    "data":fields.List(fields.Nested(user_object_marshall_definition))   
}

user_marshall_definition = {
    **base_response_marshall,
    "data":fields.Nested({"access_token":fields.String})
}

user_permission_list_marshall_definition = {
    **base_response_marshall,
    "data":fields.List(fields.Nested(permission_object_marshall_definition))
}

user_password_recovery_marshall = {
    **base_response_marshall,
    "data":fields.Nested({
        "recovery_key":fields.String,
        "question_security":fields.String
    })
}

user_info_marshall = {
    **base_response_marshall,
    "data":fields.Nested({
        **user_object_marshall_definition,
        "permissions":fields.List(fields.Nested(permission_object_marshall_definition))
    })   
}

user_check_recovery_question_marshall = {
    **base_response_marshall,
    "data":fields.Nested({
        "has_recovery_question":fields.Boolean,
        "ldap":fields.Boolean,
    })
}
  
class User_handler_logout(Resource):
    @jwt_required()
    @marshal_with(user_marshall_definition)
    def get(self):
        return logout()
    
class User_handler_refresh(Resource):
    @jwt_required()
    @marshal_with(user_marshall_definition)
    def get(self):
        return refresh()

class User_handler_login(Resource):
    
    @marshal_with(user_marshall_definition)
    def post(self):
        args_login_user = parser_user_login.parse_args()
        username = args_login_user.username
        organization_id = args_login_user.organization_id
        email = args_login_user.email
        password = args_login_user.password
        return login(
            email=email,
            password=password,
            username=username,
            organization_id=organization_id
        )

class User_handler(Resource):
    
    @jwt_required()
    @marshal_with(user_marshall_definition)
    def post(self):
        args_signin_user = parser_user_signin.parse_args()
        username = args_signin_user.username
        email = args_signin_user.email
        password = args_signin_user.password
        organization_id = args_signin_user.organization_id
        group_id = args_signin_user.group_id
        rol_id = args_signin_user.rol_id
        return signin(
            username=username,
            email=email,
            password=password,
            organization_id=organization_id,
            rol_id=rol_id,
            group_id=group_id,
        )
    
    @jwt_required()
    @marshal_with(user_marshall_definition)
    def put(self):
        args_edit_user = parser_user_edit.parse_args()
        user_args_edit_dict = { key: value for key, value in args_edit_user.items() if value is not None }
        return edit(user_args_edit_dict)

    @jwt_required()
    @marshal_with(user_marshall_definition)
    def delete(self):
        args_edit_user = parser_user_delete.parse_args()
        user_id = args_edit_user.user_id
        group_id = args_edit_user.group_id
        return signout(user_id=user_id, group_id=group_id)
    
class User_handler_list(Resource):
    
    @jwt_required()
    @marshal_with(user_object_list_marshall_definition)
    def post(self):
        args_list_user = parser_user_list.parse_args()
        group_id = args_list_user.group_id
        return list(group_id)
    
class User_handler_permissions(Resource):
    @jwt_required()
    @marshal_with(user_permission_list_marshall_definition)
    def get(self):
        return get_user_permissions()

class User_password_check_recovery_question_handler(Resource):
    
    @marshal_with(user_check_recovery_question_marshall)
    def post(self):
        args_password_recovery_key = parser_user_password_get_recovery_key.parse_args()
        email = args_password_recovery_key.email
        username = args_password_recovery_key.username
        return check_user_has_recovery_question(
            email=email, 
            username=username)
    
class User_password_recovery_key_handler(Resource):
    
    @marshal_with(user_password_recovery_marshall)
    def post(self):
        args_password_recovery_key = parser_user_password_get_recovery_key.parse_args()
        email = args_password_recovery_key.email
        username = args_password_recovery_key.username
        return generate_recovery_key(
            email=email, 
            username=username)
    
class User_password_recovery_check_question_handler(Resource):
    
    @marshal_with(base_response_marshall)
    def post(self):
        arguments_check_recovery_question = parser_user_password_check_question.parse_args()
        secret_key = arguments_check_recovery_question.secret_key
        answer_security = arguments_check_recovery_question.answer_security
        return check_recovery_question(
            secret_key=secret_key, 
            answer_security=answer_security)
    
class User_password_recovery_change_password_handler(Resource):
    
    @marshal_with(base_response_marshall)
    def post(self):
        arguments_change_password = parser_user_password_change_password.parse_args()
        secret_key = arguments_change_password.secret_key
        new_password = arguments_change_password.new_password
        return change_password(
            secret_key=secret_key,
            new_password=new_password)
        
class User_password_admin_set_password_handler(Resource):
    
    @jwt_required()
    @marshal_with(base_response_marshall)
    def post(self):
        arguments_change_password = parser_user_admin_password_change_password.parse_args()
        user_id = arguments_change_password.user_id
        new_password = arguments_change_password.password
        return administrator_password_reset(
            new_password=new_password,
            user_id=user_id)

class User_password_set_question_handler(Resource):
    @jwt_required()
    @marshal_with(base_response_marshall)
    def post(self):
        arguments_set_question = parser_user_password_set_question.parse_args()
        answer_security = arguments_set_question.answer_security
        question_security = arguments_set_question.question_security
        password = arguments_set_question.password
        return set_recovery_question(
            answer_security=answer_security,
            question_security=question_security,
            password=password)
        
class User_handler_get_user_info(Resource):
    @jwt_required()
    @marshal_with(user_info_marshall)
    def post(self):
        arguments_get_user_info = parser_user_get_user_info.parse_args()
        user_id = arguments_get_user_info.user_id
        return get_user_info(
            user_id=user_id)


user_api_blueprint.add_resource(User_handler, "")
user_api_blueprint.add_resource(User_handler_get_user_info, "/get_info")
user_api_blueprint.add_resource(User_handler_login, "/login")
user_api_blueprint.add_resource(User_handler_logout, "/logout")
user_api_blueprint.add_resource(User_handler_list, "/list")
user_api_blueprint.add_resource(User_handler_refresh, "/refresh")
user_api_blueprint.add_resource(User_handler_permissions, "/permissions")
user_api_blueprint.add_resource(User_password_recovery_key_handler, "/recovery")
user_api_blueprint.add_resource(User_password_set_question_handler, "/recovery/set_question")
user_api_blueprint.add_resource(User_password_recovery_check_question_handler, "/recovery/check")
user_api_blueprint.add_resource(User_password_recovery_change_password_handler, "/recovery/change_password")
user_api_blueprint.add_resource(User_password_check_recovery_question_handler, "/recovery/has_question")
user_api_blueprint.add_resource(User_password_admin_set_password_handler, "/recovery/admin/set_password")