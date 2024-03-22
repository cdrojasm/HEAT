from api import db

class OpenFOAM(db.Model):
    __tablename__="openFOAM"

    id = db.Column("id", db.String(64), unique=True, primary_key=True)
    oft_min = db.Column("oft_min", db.Float(), unique=False, nullable=False)
    oft_max = db.Column("oft+max", db.Float(), unique=False, nullable=False)
    delta_T = db.Column("delta_T", db.Float(), unique=False, nullable=False)
    write_delta_T = db.Column("write_delta_T", db.Float(), unique=False, nullable=False)
    STL_scale = db.Column("STL_scale", db.Float(), unique=False, nullable=False)

    mesh_min_value = db.Column("mesh_min_value", db.Integer(), unique=False, nullable=False)
    mesh_max_value = db.Column("mesh_max_value", db.Integer(), unique=False, nullable=False)

    material = db.Column("material", db.String(64), unique=False, nullable=False)

    def __init__(self, **kwargs):
        super(OpenFOAM, self).__init__(**kwargs)
        return True

    def __repr__(self):
        return f"<OpenFOAM {self.id}>"