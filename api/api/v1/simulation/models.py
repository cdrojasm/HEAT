from api import db

user_simulation_association  = Table(
    'user_simulation',
    db.metadata,
    Column('id', String, primary_key=True),
    Column('user_id', String, ForeignKey('user.id')),
    Column('simulation_id', String, ForeignKey('simulation.id'))
)

class Simulation(db.Model):
    __tablename__="simulation"

    id = db.Column("id", db.String(64), unique=True, primary_key=True)
    name = db.Column("name", db.String(128), unique=True, nullable=False)
    
    machine_id = db.Column("machine_id", db.String(64), db.ForeignKey("machine.id"))
    machine = db.relationship("Machine", backref=db.backref("machine", lazy=True, cascade="all, delete-orphans"))
    mhd_id = db.Column("mhd_id", db.String(64), db.ForeignKey("mhd.id"))
    mhd = db.relationship("mhd", backref=db.backref("mhd", lazy=True, cascade="all, delete-orphans"))

    last_run = db.Column("last_run", db.DateTime(), unique=False, nullable=True)
    created_at = db.Column("created_at", db.DateTime(), unique=False, nullable=False)
    edited_at = db.Column("edited_at", db.DateTime(), unique=False, nullable=False)

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


