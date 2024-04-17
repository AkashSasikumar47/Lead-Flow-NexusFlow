from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin

db = SQLAlchemy()


class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column('user_id', db.Integer(), db.ForeignKey('user.id'))
    role_id = db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=False)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False)
    roles = db.relationship('Role', secondary='roles_users',
                         backref=db.backref('users', lazy='dynamic'))

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    name = db.Column(db.String,nullable = False,unique = True)
    description = db.Column(db.String,nullable = False)


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
