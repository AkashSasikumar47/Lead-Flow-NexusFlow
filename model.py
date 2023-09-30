from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Inquiry(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    lead_name = db.Column(db.String(100), nullable=False)
    Sources = db.Column(db.String(100), nullable=False)
    date_of_event = db.Column(db.String(100), nullable=False)
    Pax = db.Column(db.Integer, nullable=False)
    req_food = db.Column(db.String(1000), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    contact_no = db.Column(db.String(100), nullable=False)
    progress = db.Column(db.String(100), nullable=False)
