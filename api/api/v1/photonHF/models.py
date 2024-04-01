from api import db

class PhotonHF(db.Model):
    __tablename__="photon_heat_flux"

    id = db.Column("id", db.String(64), unique=True, primary_key=True)
    path = db.Column("path", db.String(200), unique=False, nullable=False)
    n_tor = db.Column("n_tor", db.Integer, unique=False, nullable=False)
    n_reflect = db.Column("n_reflect", db.Integer, unique=False, nullable=False)
    phi_min = db.Column("phi_min", db.Float, unique=False, nullable=False)
    phi_max = db.Column("phi_max", db.Float, unique=False, nullable=False)

    def __init__(self, **kwargs):
        super(PhotonHF, self).__init__(**kwargs)
        return True

    def __repr__(self):
        return f"<PhotonHF {self.id}>"