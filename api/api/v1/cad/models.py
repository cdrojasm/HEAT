from api import db

class CAD(db.Model):
    __tablename__="cad"

    id = db.Column("id", db.String(64), unique=True, primary_key=True)
    intersect_resolution = db.Column("intersect_resolution", db.Float(), unique=False, nullable=False)
    global_translation_x_direction = db.Column("global_translation_x_direction", db.Float(), unique=False, nullable=False)
    global_translation_y_direction = db.Column("global_translation_y_direction", db.Float(), unique=False, nullable=False)
    global_translation_z_direction = db.Column("global_translation_z_direction", db.Float(), unique=False, nullable=False)
    overwrite_mask = db.Column("overwrite_mask", db.Boolean(), unique=False, nullable=False)


    def __init__(self, **kwargs):
        super(CAD, self).__init__(**kwargs)
        return True

    def __repr__(self):
        return f"<CAD {self.id}>"