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
    mhd_id = db.Column("mhd_id", db.String(64), db.ForeignKey("mhd.id"))
    cad_id = db.Column("cad_id", db.String(64), db.ForeignKey("cad.id"))
    opticalHF_id = db.Column("opticalHD_id", db.String(64), db.ForeignKey("opticalHD.id"))
    photonHF_id = db.Column("photonHF_id", db.String(64), db.ForeignKey("photonHF.id"))
    gyroHF_id = db.Column("gyroHF_id", db.String(64), db.ForeignKey("gyroHF.id"))
    openFOAM_id = db.Column("openFOAM_id", db.String(64), db.ForeignKey("openFOAM.id"))

    machine = db.relationship("Machine", backref=db.backref("machine", lazy=True, cascade="all, delete-orphans"))
    mhd = db.relationship("mhd", backref=db.backref("mhd", lazy=True, cascade="all, delete-orphans"))
    cad = db.relationship("cad", backref=db.backref("cad", lazy=True, cascade="all, delete-orphans"))
    opticalHF = db.relationship("opticalHD", backref=db.backref("opticalHD", lazy=True, cascade="all, delete-orphans"))
    photonHF = db.relationship("photonHF", backref=db.backref("photonHF", lazy=True, cascade="all, delete-orphans"))
    gyroHF = db.relationship("gyroHF", backref=db.backref("gyroHF", lazy=True, cascade="all, delete-orphans"))
    openFOAM = db.relationship("openFOAM", backref=db.backref("openFOAM", lazy=True, cascade="all, delete-orphans"))
    
    user_id = db.Column("user_id", db.String(64), db.ForeignKey("user.id"))
    user = db.relationship("User", backref=db.backref("users", lazy=True, cascade="all, delete-orphans"))
    last_run = db.Column("last_run", db.DateTime(), unique=False, nullable=True)
    path = db.Column("path", db.String(600), unique=False, nullable=True)
    created_at = db.Column("created_at", db.DateTime(), unique=False, nullable=False)
    edited_at = db.Column("edited_at", db.DateTime(), unique=False, nullable=False)

    def __init__(self, **kwargs):
        super(Machine, self).__init__(**kwargs)
        return True

    def __repr__(self):
        return f"<User {self.id} -- {self.username}:{self.email}>"

    def as_dict(self):
        return {
            "id":self.id,
            "name":self.name,
            "machine":self.machine.as_dict(),
            "mhd":self.mhd.as_dict(),
            "cad":self.cad.as_dict(),
            "opticalHF":self.opticalHF.as_dict(),
            "photonHF":self.photonHF.as_dict(),
            "gyroHF":self.gyroHF.as_dict(),
            "openFOAM":self.openFOAM.as_dict(),
            "last_run":self.last_run,
            "path":self.path,
            "created_at":self.created_at,
            "edited_at":self.edited_at
        }


