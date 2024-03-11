from source import db

class MHD(db.Model):
    __tablename__="mhd"

    id = db.Column("id", db.String(64), unique=True, primary_key=True)
    user_id = db.Column("user_id", db.String(64), db.ForeignKey("user.id"))
    user = db.relationship("User", backref=db.backref("users", lazy=True, cascade="all, delete-orphans"))
    experiment_id = db.Column("experiment_id", db.String(64), db.ForeignKey("cascade.id"))
    experiment = db.relationship("Experiment", backref=db.backref("experiments", lazy=True, cascade="all, delete-orphans"))
    shot = db.Column("shot", db.Integer(), unique=False, nullable=False)
    tmin = db.Column("tmin", db.Integer(), unique=False, nullable=False)
    tmax = db.Column("tmax", db.Integer(), unique=False, nullable=False)
    traceLength = db.Column("traceLength", db.Integer(), unique=False, nullable=False)
    dpinit = db.Column("dpinit", db.Float(), unique=False, nullable=False)

    

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


