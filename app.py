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




if __name__ == "__main__":
    app.run(debug=True)