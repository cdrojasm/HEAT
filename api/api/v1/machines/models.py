from source import db

class Machine(db.Model):
    __tablename__="machine"

    id = db.Column("id", db.String(64), unique=True, primary_key=True)
    user_id = db.Column("user_id", db.String(64), db.ForeignKey("user.id"))
    user = db.relationship("User", backref=db.backref("users", lazy=True, cascade="all, delete-orphans"))
    simulation_id = db.Column("simulation_id", db.String(64), db.ForeignKey("simulation.id"))
    simulation = db.relationship("simulation", backref=db.backref("simulation", lazy=True, cascade="all, delete-orphans"))
    name = db.Column("name", db.String(128), unique=True, nullable=False)
    alias = db.Column("alias", db.String("50"), unique=True, nullable=True)
    description = db.Column("description", db.String(500), unique=False, nullable=True)

    def __init__(self, **kwargs):
        super(Machine, self).__init__(**kwargs)
        return True

    def __repr__(self):
        return f"<Machine {self.id}>"

    def get_machine_name(self):
        return self.name

    def get_machine_alias(self):
        return self.alias

    def get_machine_description(self):
        return self.description

    def to_dict(self):
        return {
                "name":self.name,
                "alias":self.alias,
                "description":self.description
                }


