from api import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Table, Column, String, ForeignKey
from ..simulation.models import Simulation

user_simulation_association  = Table(
    'user_simulation_association',
    db.metadata,
    Column('id', String, primary_key=True),
    Column('user_id', String, ForeignKey('user.id')),
    Column('simulation_id', String, ForeignKey('simulation.id'))
)

class User(db.Model):
    __tablename__="user"

    id = db.Column("id", db.String(64), unique=True, primary_key=True)
    username = db.Column("username", db.String(128), unique=True, nullable=False)
    email = db.Column("email", db.String(128), unique=True, nullable=False)
    password = db.Column("password", db.String(128), unique=False, nullable=False)
    created_at = db.Column("created_at", db.DateTime, unique=False, nullable=False)
    updated_at = db.Column("updated_at", db.DateTime, unique=False, nullable=False)
    last_login = db.Column("last_login", db.DateTime, unique=False, nullable=True)
    active = db.Column("active", db.Boolean, unique=False, nullable=False)
    logged_in = db.Column("logged_in", db.Boolean, unique=False, nullable=False)
    simulations = db.relationship("Simulation", secondary=user_simulation_association, back_populates="users")

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        return True

    def __repr__(self):
        return f"<User {self.id} -- {self.username}:{self.email}>"

    def to_dict(self):
        return {
                "username":self.username,
                "email":self.email,
                "last_login":self.last_login, 
                "created_at":self.created_at,
                "updated_at":self.updated_at, 
                "active":self.active
                }

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)