from flask import Flask, render_template ,request,redirect, url_for
from model import *
import os
from flask_cors import CORS

app = Flask(__name__)
app.app_context().push()

@app.route('/',methods=['GET','POST'])
def home():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)