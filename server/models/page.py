from server.app import db

class Page(db.Model):
    __tablename__ = 'Pages'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    body = db.Column(nullable=False)
