from api import db

class GyroHF(db.Model):
    __tablename__="gyro_heat_flux"

    id = db.Column("id", db.String(64), unique=True, primary_key=True)
    n_gyro_steps = db.Column("n_gyro_steps", db.Integer, unique=False, nullable=False)
    gyro_trace_length = db.Column("gyro_trace_length", db.Integer, unique=False, nullable=False)
    gyro_T_ev = db.Column("gyro_T_ev", db.Float, unique=False, nullable=False)
    n_vSlice = db.Column("n_vSlice", db.Integer, unique=False, nullable=False)
    n_vPhase = db.Column("n_vPhase", db.Integer, unique=False, nullable=False)
    n_gyroPhase = db.Column("n_gyroPhase", db.Integer, unique=False, nullable=False)
    ion_mass_AMU = db.Column("ion_mass_AMU", db.Float, unique=False, nullable=False)
    v_mode = db.Column("v_mode", db.String(64), unique=False, nullable=False)
    ion_frac = db.Column("ion_frac", db.Float, unique=False, nullable=False)
    gyro_sources = db.Column("gyro_sources", db.String(64), unique=False, nullable=False)

    def __init__(self, **kwargs):
        super(GyroHF, self).__init__(**kwargs)
        return True

    def __repr__(self):
        return f"<GyroHF {self.id}>"