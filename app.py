from flask import Flask, render_template ,request,redirect, url_for, jsonify
from model import *
import os
import psycopg2
from flask_cors import CORS

#==============================configuration===============================

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:1610@localhost/Lead_flow'
#CORS(app)
db.init_app(app)
app.app_context().push()


@app.route('/',methods=['GET','POST'])
def home():
    return render_template('index.html')

# /ST-general-settings
@app.route('/ST-general-settings',methods=['GET','POST'])
def settings():
    return render_template('ST-general-settings.html')

#/pages-login

@app.route('/pages-login',methods=['GET','POST'])
def login():
    return render_template('pages-login.html')


#/M-Inquiries

@app.route('/M-Inquiries',methods=['GET','POST'])
def Inquiries():
    if request.method == 'GET':
        Inquiries = Inquiry.query.order_by(Inquiry.id).all()
        return render_template('M-Inquiries.html',Inquiries=Inquiries)
    if request.method == 'POST':
        a = request.form['floatingName']
        b = request.form['floatingSources']
        c = request.form['floatingEventDate']
        h = request.form['floatingPax']
        d = request.form['floatingFoodType']
        e = request.form['floatingEmail']
        f = request.form['Contact_number']
        g = request.form['status']
        # print(a,b,c,d,f,g,h)
        inquiry = Inquiry(lead_name=a,Sources=b,date_of_event=c,Pax=h,req_food=d,email=e,contact_no=f,progress=g)
        db.session.add(inquiry)
        db.session.commit()
        return redirect('/M-Inquiries')
    

#/edit_inquiry/${id}/${status}
@app.route('/edit_inquiry/<int:id>/<string:status>',methods=['GET','POST'])
def edit_inquiry(id,status):
    #edit status
    i = Inquiry.query.filter_by(id=id)
    i.update({'progress':status})
    db.session.commit()
    return jsonify({'message': 'Status Updated'})

#/delete_inquiry/${id}
@app.route('/delete_inquiry/<int:id>',methods=['GET','POST'])
def delete_inquiry(id):
    #delete inquiry
    i = Inquiry.query.filter_by(id=id).first()
    db.session.delete(i)
    db.session.commit()
    return jsonify({'message': 'Inquiry Deleted'})

    

#/M-Proposals
@app.route('/M-Proposals',methods=['GET','POST'])
def Proposals():
    return render_template('M-Proposals.html')

#/ST-user-settings

@app.route('/ST-user-settings',methods=['GET','POST'])
def usersettings():
    return render_template('ST-user-settings.html')

#/pages-contact
@app.route('/pages-contact',methods=['GET','POST'])
def pagescontact():
    return render_template('pages-contact.html')



if __name__ == "__main__":
    app.run(debug=True)