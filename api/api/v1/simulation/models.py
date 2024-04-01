from api import db

from ..machine.models import Machine
from ..mhd.models import MHD
from ..cad.models import CAD
from ..opticalHF.models import OpticalHF
from ..photonHF.models import PhotonHF
from ..gyroHF.models import GyroHF
from ..openFOAM.models import OpenFOAM


class Simulation(db.Model):
    __tablename__="simulation"

    id = db.Column("id", db.String(64), unique=True, primary_key=True)
    name = db.Column("name", db.String(128), unique=True, nullable=False)
    description= db.Column("description", db.String(600), unique=False, nullable=True)

    machine_id = db.Column("machine_id", db.String(64), db.ForeignKey("machine.id"), nullable=True)
    mhd_id = db.Column("mhd_id", db.String(64), db.ForeignKey("mhd.id"), nullable=True)
    cad_id = db.Column("cad_id", db.String(64), db.ForeignKey("cad.id"), nullable=True)
    opticalHF_id = db.Column("opticalHD_id", db.String(64), db.ForeignKey("optical_heat_flux.id"), nullable=True)
    photonHF_id = db.Column("photonHF_id", db.String(64), db.ForeignKey("photon_heat_flux.id"), nullable=True)
    gyroHF_id = db.Column("gyroHF_id", db.String(64), db.ForeignKey("gyro_heat_flux.id"), nullable=True)
    openFOAM_id = db.Column("openFOAM_id", db.String(64), db.ForeignKey("open_FOAM.id"), nullable=True)

    machine = db.relationship("Machine", backref=db.backref("simulation", lazy=True, cascade="all, delete-orphan"))
    mhd = db.relationship("MHD", backref=db.backref("simulation", lazy=True, cascade="all, delete-orphan"))
    cad = db.relationship("CAD", backref=db.backref("simulation", lazy=True, cascade="all, delete-orphan"))
    opticalHF = db.relationship("OpticalHF", backref=db.backref("simulation", lazy=True, cascade="all, delete-orphan"))
    photonHF = db.relationship("PhotonHF", backref=db.backref("simulation", lazy=True, cascade="all, delete-orphan"))
    gyroHF = db.relationship("GyroHF", backref=db.backref("simulation", lazy=True, cascade="all, delete-orphan"))
    openFOAM = db.relationship("OpenFOAM", backref=db.backref("simulation", lazy=True, cascade="all, delete-orphan"))
    
    user_id = db.Column("user_id", db.String(64), db.ForeignKey("user.id"))
    user = db.relationship("User", backref=db.backref("users", lazy=True, cascade="all, delete-orphan"))
    last_run = db.Column("last_run", db.DateTime, unique=False, nullable=True)
    path = db.Column("path", db.String(600), unique=False, nullable=True)
    created_at = db.Column("created_at", db.DateTime, unique=False, nullable=False)
    edited_at = db.Column("edited_at", db.DateTime, unique=False, nullable=False)

    def __init__(self, **kwargs):
        super(Simulation, self).__init__(**kwargs)
        return True

    def __repr__(self):
        return f"<Simulation {self.id}>"

    def as_dict(self):
        return {
            "id":self.id,
            "name":self.name,
            "description":self.description,
            "machine":self.machine.as_dict() if self.gyroHF else None,
            "mhd":self.mhd.as_dict() if self.gyroHF else None,
            "cad":self.cad.as_dict() if self.gyroHF else None,
            "opticalHF":self.opticalHF.as_dict() if self.gyroHF else None,
            "photonHF":self.photonHF.as_dict() if self.gyroHF else None,
            "gyroHF":self.gyroHF.as_dict() if self.gyroHF else None,
            "openFOAM":self.openFOAM.as_dict() if self.gyroHF else None,
            "last_run":self.last_run,
            "path":self.path,
            "created_at":self.created_at,
            "edited_at":self.edited_at
        }


