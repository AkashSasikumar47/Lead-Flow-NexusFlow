from flask import Flask, render_template, request, redirect, url_for, jsonify
from model import db, User, Role, Inquiry
import os
from flask_cors import CORS
from config import DevelopmentConfig
from sec import datastore
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required
from flask_security import auth_required, roles_required, current_user
from werkzeug.security import check_password_hash, generate_password_hash
from flask_restful import marshal, fields

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)

app.security = Security(app, datastore)

db.init_app(app)
app.app_context().push()


@app.get('/')
def index():
    return render_template('index.html')


@app.post('/user-login')
def user_login():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({"message": "email not provided"}), 400

    user = datastore.find_user(email=email)

    if not user:
        return jsonify({"message": "User Not Found"}), 404
    
    if not user.active:
        return jsonify({"message": "User Not Activated"}), 400
    

    if check_password_hash(user.password, data.get("password")):
        return jsonify({"token": user.get_auth_token(), "email": user.email, "role": user.roles[0].name, "username": user.username, "id": user.id})
    else:
        return jsonify({"message": "Wrong Password"}), 400

user_fields = {
    "id": fields.Integer,
    "username": fields.String,
    "email": fields.String,
    "active": fields.Boolean,
}

@app.get('/users')
@auth_required("token")
@roles_required("Admin")
def all_users():
    users = User.query.all()
    if len(users) == 0:
        return jsonify({"message": "No User Found"}), 404
    return marshal(users, user_fields)

@app.get('/activate/manager/<int:id>')
@auth_required("token")
@roles_required("Admin")
def activate_customer(id):
    User.query.filter_by(id = id).update({'active':True})
    db.session.commit()
    return jsonify({"message":"Manager activated"})

@app.get('/deactivate/manager/<int:id>')
@auth_required("token")
@roles_required("Admin")
def deactivate_customer(id):
    User.query.filter_by(id = id).update({'active':False})
    db.session.commit()
    return jsonify({"message":"Manager deactivated"})






@app.get('/api/getleads')
@auth_required("token")
@roles_required("Manager")
def getleads():
    leads = Inquiry.query.all()
    leadlist = []
    for lead in leads:
        leadlist.append({'id':lead.id,'name':lead.lead_name,'email':lead.email,'contact':lead.contact_no,'date':lead.date_of_event,'pax':lead.Pax,'food':lead.req_food,'source':lead.Sources,'status':lead.progress})
    return jsonify(leadlist),200



@app.post('/api/addlead')
@auth_required("token")
@roles_required("Manager")
def addlead():
    data = request.get_json()
    name = data.get('Name')
    email = data.get('Email')
    contact = data.get('ContactNumber')
    date = data.get('Date')
    pax = data.get('Pax')
    food = data.get('FoodType')
    source = data.get('Sources')
    status = data.get('status')

    if not name:
        return jsonify({'message':'name is required'}),400
    if not email:
        return jsonify({'message':'email is required'}),400
    if not contact:
        return jsonify({'message':'contact is required'}),400
    if not date:
        return jsonify({'message':'date is required'}),400
    if not pax:
        return jsonify({'message':'pax is required'}),400
    if not food:
        return jsonify({'message':'food is required'}),400
    if not source:
        return jsonify({'message':'source is required'}),400
    if not status:
        return jsonify({'message':'status is required'}),400
    


    lead = Inquiry(lead_name=name,email=email,contact_no=contact,date_of_event=date,Pax=pax,req_food=food,Sources=source,progress=status)
    db.session.add(lead)
    db.session.commit()
    return jsonify({'message':'success'}),200



@app.delete('/api/deletelead/<int:id>')
@auth_required("token")
@roles_required("Manager")
def deletelead(id):
    lead = Inquiry.query.get_or_404(id)
    db.session.delete(lead)
    db.session.commit()
    return jsonify({'message':'success'}),200


@app.put('/api/updateleadstatus/<int:id>')
@auth_required("token")
@roles_required("Manager")
def updateleadstatus(id):
    lead = Inquiry.query.get_or_404(id)
    data = request.get_json()
    lead.progress = data.get('status')
    db.session.commit()
    return jsonify({'message':'success'}),200










if __name__ == '__main__':
    app.run(debug=True)