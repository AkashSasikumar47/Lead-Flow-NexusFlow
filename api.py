from flask_restful import Resource, Api, fields, marshal_with, reqparse
from model import *
from werkzeug.exceptions import HTTPException
from flask_cors import CORS
import json
from flask import make_response
from flask_security import auth_required, roles_required
import os
from functools import wraps
from flask import abort
from flask_security import roles_accepted
from flask import jsonify
from flask import request
import pandas as pd
from io import BytesIO
from datetime import datetime, timedelta
from sqlalchemy.exc import IntegrityError

api = Api()

def any_role_required(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            if not roles_accepted(*roles):
                abort(403, description="Insufficient permissions")
            return fn(*args, **kwargs)
        return decorator
    return wrapper

#==========================Validation========================================================
class NotFoundError(HTTPException):
    def __init__(self,status_code):
        message = {"error_code":"BE1009","error_message":"Not Found"}
        self.response = make_response(json.dumps(message), status_code)

class BusinessValidationError(HTTPException):
    def __init__(self, status_code, error_code, error_message):
        message = {"error_code":error_code,"error_message":error_message}
        self.response = make_response(json.dumps(message), status_code)

#==============================output fields========================================

inquiry_fields = {
    "id": fields.Integer,
    "Company_Name": fields.String,
    "Organizer": fields.String,
    "Location_Area": fields.String,
    "date_of_event": fields.String,
    "Pax": fields.Integer,
    "req_food": fields.String,
    "email": fields.String,
    "contact_no": fields.String,
    "progress": fields.String
}

#====================Create Inquiry request pares=======================================

create_inquiry_parser = reqparse.RequestParser()
create_inquiry_parser.add_argument("Company_Name", type=str, required=True, help="Company Name is required")
create_inquiry_parser.add_argument("Organizer", type=str, required=True, help="Organizer is required")
create_inquiry_parser.add_argument("Location_Area", type=str, required=True, help="Location/Area is required")
create_inquiry_parser.add_argument("date_of_event", type=str, required=True, help="Date of Event is required")
create_inquiry_parser.add_argument("Pax", type=int, required=True, help="Pax is required")
create_inquiry_parser.add_argument("req_food", type=str, required=True, help="Food is required")
create_inquiry_parser.add_argument("email", type=str, required=True, help="Email is required")
create_inquiry_parser.add_argument("contact_no", type=str, required=True, help="Contact Number is required")
create_inquiry_parser.add_argument("progress", type=str, required=True, help="Progress is required")

#====================Update Inquiry request pares=======================================
update_inquiry_parser = reqparse.RequestParser()
update_inquiry_parser.add_argument("Company_Name", type=str)
update_inquiry_parser.add_argument("Organizer", type=str)
update_inquiry_parser.add_argument("Location_Area", type=str)
update_inquiry_parser.add_argument("date_of_event", type=str)
update_inquiry_parser.add_argument("Pax", type=int)
update_inquiry_parser.add_argument("req_food", type=str)
update_inquiry_parser.add_argument("email", type=str)
update_inquiry_parser.add_argument("contact_no", type=str)
update_inquiry_parser.add_argument("progress", type=str)


#=================================Inquiry api======================================================

class InquiryApi(Resource):
    @marshal_with(inquiry_fields)
    @auth_required("token")
    @any_role_required("Admin","Manager")
    def get(self):
        #get all inquiries
        inquiries = Inquiry.query.all()
        return inquiries

    @auth_required("token")
    @any_role_required("Admin","Manager")
    def delete(self,id):
        inquiry = Inquiry.query.get(id)
        if not inquiry:
            raise NotFoundError(404)
        db.session.delete(inquiry)
        db.session.commit()
        return {"message":"Inquiry Deleted"}

    @marshal_with(inquiry_fields)
    @auth_required("token")
    @any_role_required("Admin","Manager")
    def put(self,id):
        inquiry = Inquiry.query.get(id)
        if not inquiry:
            raise NotFoundError(404)
        data = update_inquiry_parser.parse_args()
        for key,value in data.items():
            if value:
                setattr(inquiry,key,value)
        db.session.commit()
        return inquiry
    
    @auth_required("token")
    @any_role_required("Admin","Manager")
    def post(self):
        data = create_inquiry_parser.parse_args()
        inquiry = Inquiry(**data)
        db.session.add(inquiry)
        db.session.commit()
        return {"message":"Inquiry Created"}


#below code is for uploading excel file but it will not check for duplicate entry in the database
class ExcelUploadApi(Resource):
    @auth_required("token")
    @any_role_required("Admin", "Manager")
    def post(self):
        if 'file' not in request.files:
            return {"message": "No file part"}, 400
        file = request.files['file']
        if file.filename == '':
            return {"message": "No selected file"}, 400
        if file and file.filename.endswith('.xlsx'):
            try:
                df = pd.read_excel(BytesIO(file.read()))
                required_columns = ["Company_Name", "Organizer", "Location_Area", "date_of_event", "Pax", "req_food", "email", "contact_no", "progress"]
                if not all(col in df.columns for col in required_columns):
                    return {"message": "Excel file is missing required columns"}, 400
                
                for _, row in df.iterrows():
                    # Convert Timestamp to string
                    date_of_event = row['date_of_event'].strftime('%Y-%m-%d') if pd.notnull(row['date_of_event']) else None
                    inquiry = Inquiry(
                        Company_Name=row['Company_Name'],
                        Organizer=row['Organizer'],
                        Location_Area=row['Location_Area'],
                        date_of_event=date_of_event,
                        Pax=int(row['Pax']),
                        req_food=row['req_food'],
                        email=row['email'],
                        contact_no=str(row['contact_no']),
                        progress=row['progress']
                    )
                    db.session.add(inquiry)
                db.session.commit()
                return {"message": f"Successfully imported {len(df)} records"}, 200
            except Exception as e:
                db.session.rollback()
                return {"message": f"Error processing file: {str(e)}"}, 500
        return {"message": "Invalid file format. Please upload an Excel file (.xlsx)"}, 400

# below code is for checking duplicate entry, to try this code comment the above code and uncomment this code
''' class ExcelUploadApi(Resource):
    @auth_required("token")
    @any_role_required("Admin", "Manager")
    def post(self):
        if 'file' not in request.files:
            return {"message": "No file part"}, 400
        file = request.files['file']
        if file.filename == '':
            return {"message": "No selected file"}, 400
        if file and file.filename.endswith('.xlsx'):
            try:
                df = pd.read_excel(BytesIO(file.read()))
                required_columns = ["Company_Name", "Organizer", "Location_Area", "date_of_event", "Pax", "req_food", "email", "contact_no", "progress"]
                if not all(col in df.columns for col in required_columns):
                    return {"message": "Excel file is missing required columns"}, 400
                
                records_added = 0
                records_skipped = 0

                for _, row in df.iterrows():
                    date_of_event = row['date_of_event'].strftime('%Y-%m-%d') if pd.notnull(row['date_of_event']) else None
                    
                    # Check if a record with the same Company_Name, Organizer, and date_of_event already exists
                    existing_inquiry = Inquiry.query.filter_by(
                        Company_Name=row['Company_Name'],
                        Organizer=row['Organizer'],
                        date_of_event=date_of_event
                    ).first()

                    if existing_inquiry:
                        records_skipped += 1
                        continue

                    inquiry = Inquiry(
                        Company_Name=row['Company_Name'],
                        Organizer=row['Organizer'],
                        Location_Area=row['Location_Area'],
                        date_of_event=date_of_event,
                        Pax=int(row['Pax']),
                        req_food=row['req_food'],
                        email=row['email'],
                        contact_no=str(row['contact_no']),
                        progress=row['progress']
                    )
                    db.session.add(inquiry)
                    records_added += 1

                db.session.commit()
                return {
                    "message": f"Successfully imported {records_added} records. {records_skipped} records were skipped as duplicates."
                }, 200
            except IntegrityError:
                db.session.rollback()
                return {"message": "Error: Duplicate entry found. The upload was aborted."}, 400
            except Exception as e:
                db.session.rollback()
                return {"message": f"Error processing file: {str(e)}"}, 500
        return {"message": "Invalid file format. Please upload an Excel file (.xlsx)"}, 400 '''


 
api.add_resource(InquiryApi,"/api/inquiry","/api/inquiry/<int:id>")
api.add_resource(ExcelUploadApi, "/api/upload-excel")

    
