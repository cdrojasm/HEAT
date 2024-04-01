from api import db

class OpticalHF(db.Model):
    __tablename__="optical_heat_flux"

    AVAILABLE_HF_MODES = ["eich", "multi_exponential", "limiter", "tophat"]

    id = db.Column("id", db.String(64), unique=True, primary_key=True)
    hf_mode = db.Column("hf_mode", db.Enum(*AVAILABLE_HF_MODES ), unique=False, nullable=False)
    lqCN = db.Column("lqCN", db.Float, unique=False, nullable=False)
    lqCF = db.Column("lqCF", db.Float, unique=False, nullable=False)
    lqPN = db.Column("lqPN", db.Float, unique=False, nullable=False)
    lqPF = db.Column("lqPF", db.Float, unique=False, nullable=False)
    lqCNmode = db.Column("lqCNmode", db.Enum("eich", "user"), unique=False, nullable=False)
    lqCFmode = db.Column("lqCFmode", db.Enum("horacek", "user"), unique=False, nullable=False)
    lqPNmode = db.Column("lqPNmode", db.Enum("user"), unique=False, nullable=False)
    lqPFmode = db.Column("lqPFmode", db.Enum("user"), unique=False, nullable=False)
    S = db.Column("S", db.Float, unique=False, nullable=False)
    Smode = db.Column("Smode", db.Enum("makowski", "user"))
    fracCN = db.Column("fracCN", db.Float, unique=False, nullable=False)
    fracCF = db.Column("fracCF", db.Float, unique=False, nullable=False)
    fracPN = db.Column("fracPN", db.Float, unique=False, nullable=False)
    fracPF = db.Column("fracPF", db.Float, unique=False, nullable=False)
    fracUI = db.Column("fracUI", db.Float, unique=False, nullable=False)
    fracUO = db.Column("fracUO", db.Float, unique=False, nullable=False)
    fracLI = db.Column("fracLI", db.Float, unique=False, nullable=False)
    fracLO = db.Column("fracLO", db.Float, unique=False, nullable=False)
    P = db.Column("P", db.Float, unique=False, nullable=False)
    lossFrac = db.Column("lossFrac", db.Float, unique=False, nullable=False)
    qBG = db.Column("qBG", db.Float, unique=False, nullable=False)
    fG = db.Column("fG", db.Float, unique=False, nullable=False)
    

    def __init__(self, **kwargs):
        super(OpticalHF, self).__init__(**kwargs)
        return True

    def __repr__(self):
        return f"<OpticalHF {self.id}>"