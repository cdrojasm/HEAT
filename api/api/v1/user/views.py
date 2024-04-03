import datetime
from .models import User
from api import db
import uuid
from sqlalchemy import or_

def create(
    username:str,
    email:str,
    password:str
):
    if db.session.query(User).filter(or_(
        User.email==email, 
        User.username==username)).first() is not None:
        return {
            "status":"error",
            "msg":"User with email or username already exists"
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
    password:str
):
    user_instance = User.query.filter_by(id=user_id).first()
    if user_instance is None:
        return {
            "status":"error",
            "msg":"User not found"
        }, 400
    if not user_instance.check_password(password):
        return {
            "status":"error",
            "msg":"Password incorrect, cant edit"
        }, 400
    if username != user_instance.username:
        user_instance.username = username
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
    else:
        return {
            "status":"error",
            "msg":"No changes detected"
        }, 400

def delete(user_id:str):
    user_instance = User.query.filter_by(id=user_id).first()
    if user_instance is None:
        return {
            "status":"error",
            "msg":"User not found"
        }, 400
    try:
        db.session.delete(user_instance)
        db.session.commit()
    except Exception as e:
        return {
            "status":"error",
            "msg":str(e)
        }, 500
    return {
        "status":"success",
        "msg":"User deleted successfully"
    }, 200

def login(
    email:str,
    password:str,
    username:str
):
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
    if user_instance.logged_in == None or user_instance.logged_in == True:
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
        user_instance.logged_in = True
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


def logout(
    email:str,
    username:str
):
    if username is not None:
        user_instance = User.query.filter_by(username=username).first()
    elif email is not None:
        user_instance = User.query.filter_by(email=email).first()
    else:
        return {
            "status":"error",
            "msg":"No username or email provided"
        }, 400
    if user_instance is None:
        return {
            "status":"error",
            "msg":"User not found"
        }, 400
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
    try:
        db.session.commit()
    except Exception as e:
        return {
            "status":"error",
            "msg":str(e)
        }, 500
    return {
        "status":"success",
        "msg":"Logout successful"
    }, 200
