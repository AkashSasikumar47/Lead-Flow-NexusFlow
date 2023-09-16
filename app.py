from flask import Flask, render_template ,request,redirect, url_for
from model import *
import os
from flask_cors import CORS

app = Flask(__name__)
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
    return render_template('M-Inquiries.html')

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