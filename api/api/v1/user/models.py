from source import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__="users"

    id = db.Column("id", db.String(64), unique=True, primary_key=True)
    username = db.Column("username", db.String(128), unique=True, nullable=False)
    email = db.Column("email", db.String(128), unique=True, nullable=False)
    password = db.Column("password", db.String(128), unique=False, nullable=False)
    created_at = db.Column("created_at", db.DateTime(), unique=False, nullable=False)
    updated_at = db.Column("updated_at", db.DateTime(), unique=False, nullable=False)
    last_login = db.Column("last_login", db.DateTime(), unique=False, nullable=True)
    active = db.Column("active", db.Boolean(), unique=False, nullable=False)

    def __init__(self, **kwargs):
        super(Machine, self).__init__(**kwargs)
        return True

    def __repr__(self):
        return f"<User {self.id} -- {self.username}:{self.email}>"

    def to_dict(self):
        return {
                "username":self.username,
                "email":self.email,
                "last_login":self.last_login
                }

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)