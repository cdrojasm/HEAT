import datetime
from .models import User
from api import db
import uuid

def create(
    username:str,
    email:str,
    password:str
):
    if User.query.filter_by(email=email).first() is not None:
        return {
            "status":"error",
            "msg":"User with email already exists"
        }, 400
    user_instance = User(
        id = str(uuid.uuid4()),
        username=username,
        email=email,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        active=True,
        logged_in=False
    )
    user_instance.set_password(password)
    try:
        db.session.add(user_instance)
        db.session.commit()
    except Exception as e:
        return {
            "status":"error",
            "msg":str(e)
        }, 500
    return {
        "status":"success",
        "msg":"User created successfully",
        "data":user_instance.to_dict()
    }, 201


def list_():
    users = User.query.all()
    return {
        "status":"success",
        "msg":"Users retrieved successfully",
        "data":[user.to_dict() for user in users]
    }, 200

def edit(
    user_id:str,
    username:str,
    email:str,
    password:str
):
    user_instance = User.query.filter_by(id=user_id).first()
    if user_instance is None:
        return {
            "status":"error",
            "msg":"User not found"
        }, 400
    if user_instance.check_password(password):
        return {
            "status":"error",
            "msg":"Password incorrect"
        }, 400
    user_instance.username = username
    user_instance.email = email
    user_instance.set_password(password)
    user_instance.updated_at = datetime.datetime.now()
    try:
        db.session.commit()
    except Exception as e:
        return {
            "status":"error",
            "msg":str(e)
        }, 500
    return {
        "status":"success",
        "msg":"User updated successfully",
        "data":user_instance.to_dict()
    }, 200

def delete(user_id:str):
    return {
        "status":"error",
        "msg":"Not implemented"
    }, 500

def login(
    email:str,
    password:str,
    username:str
):
    user = None
    if username is not None:
        user_instance = User.query.filter_by(username=username).first()
    else:
        user_instance = User.query.filter_by(email=email).first()
    if user_instance is None:
        return {
            "status":"error",
            "msg":"User not found"
        }, 400
    if not user_instance.active:
        return {
            "status":"error",
            "msg":"User not active"
        }, 400
    if user.logged_in:
        return {
            "status":"error",
            "msg":"User already logged in"
        }, 400
    if not user_instance.check_password(password):
        return {
            "status":"error",
            "msg":"Password incorrect"
        }, 400
    else:
        user_instance.last_login = datetime.datetime.now()
        try:
            db.session.commit()
        except Exception as e:
            return {
                "status":"error",
                "msg":str(e)
            }, 500
        return {
            "status":"success",
            "msg":"Login successful",
            "data":user_instance.to_dict()
        }, 200


def logout(email:str):
    user_instance = User.query.filter_by(email=email).first()
    if user_instance is None:
        return {
            "status":"error",
            "msg":"User not found"
        }, 400
    if not user_instance.logged_in:
        return {
            "status":"error",
            "msg":"User not logged in"
        }, 400
    user_instance.logged_in = False
    user_instance.last_login = None
    return {
        "status":"success",
        "msg":"Logout successful"
    }, 200
