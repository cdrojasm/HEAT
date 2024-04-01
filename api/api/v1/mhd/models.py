from api import db

class MHD(db.Model):
    __tablename__="mhd"

    id = db.Column("id", db.String(64), unique=True, primary_key=True)
    shot = db.Column("shot", db.Integer, unique=False, nullable=False)
    tmin = db.Column("tmin", db.Integer, unique=False, nullable=False)
    tmax = db.Column("tmax", db.Integer, unique=False, nullable=False)
    traceLength = db.Column("traceLength", db.Integer, unique=False, nullable=False)
    dpinit = db.Column("dpinit", db.Float, unique=False, nullable=False)

    def __init__(self, **kwargs):
        super(MHD, self).__init__(**kwargs)
        return True

    def __repr__(self):
        return f"<MHD {self.id}>"

    def as_dict(self):
        return {
                "shot":self.shot,
                "tmin":self.tmin,
                "tmax":self.tmax,
                "traceLength":self.traceLength,
                "dpinit":self.dpinit
                }