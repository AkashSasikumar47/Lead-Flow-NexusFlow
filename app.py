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
from api import *
from datetime import datetime, timedelta
from sqlalchemy import func

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
api.init_app(app)
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

@app.route('/api/dashboard-data')
@auth_required("token")
@roles_required("Manager")
def dashboard_data():
    try:
        date_range = request.args.get('dateRange', 'week')
        start_date = request.args.get('startDate')
        end_date = request.args.get('endDate')

        # Calculate date range based on input
        if date_range == 'week':
            end_date = datetime.utcnow().date()
            start_date = end_date - timedelta(days=7)
        elif date_range == 'month':
            end_date = datetime.utcnow().date()
            start_date = end_date - timedelta(days=30)
        elif date_range == 'year':
            end_date = datetime.utcnow().date()
            start_date = end_date - timedelta(days=365)
        else:
            start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
            end_date = datetime.strptime(end_date, '%Y-%m-%d').date()

        # Query data based on date range
        inquiries = Inquiry.query.filter(func.date(Inquiry.date_of_event) >= start_date,
                                         func.date(Inquiry.date_of_event) <= end_date).all()

        total_leads = len(inquiries)
        confirmed_leads = sum(1 for inq in inquiries if inq.progress == 'Confirmed')
        
        # Calculate metrics
        conversion_rate = (confirmed_leads / total_leads * 100) if total_leads > 0 else 0
        
        # Assuming each confirmed lead results in a deal with an average value of $1000
        estimated_revenue = confirmed_leads * 1000
        
        # Calculate changes compared to previous period
        previous_start = start_date - (end_date - start_date)
        previous_inquiries = Inquiry.query.filter(func.date(Inquiry.date_of_event) >= previous_start,
                                                  func.date(Inquiry.date_of_event) < start_date).all()
        previous_total = len(previous_inquiries)
        previous_confirmed = sum(1 for inq in previous_inquiries if inq.progress == 'Confirmed')
        previous_conversion_rate = (previous_confirmed / previous_total * 100) if previous_total > 0 else 0
        previous_revenue = previous_confirmed * 1000

        lead_growth_rate = ((total_leads - previous_total) / previous_total * 100) if previous_total > 0 else 0
        conversion_rate_change = conversion_rate - previous_conversion_rate
        revenue_change = ((estimated_revenue - previous_revenue) / previous_revenue * 100) if previous_revenue > 0 else 0

        # Prepare data for charts
        lead_trends_data = [{'date': inq.date_of_event, 'value': 1} for inq in inquiries]
        top_company_fields = db.session.query(Inquiry.Company_Name, func.count(Inquiry.id).label('count'))\
            .filter(func.date(Inquiry.date_of_event) >= start_date, func.date(Inquiry.date_of_event) <= end_date)\
            .group_by(Inquiry.Company_Name)\
            .order_by(func.count(Inquiry.id).desc())\
            .limit(5).all()
        regional_distribution = db.session.query(Inquiry.Location_Area, func.count(Inquiry.id).label('count'))\
            .filter(func.date(Inquiry.date_of_event) >= start_date, func.date(Inquiry.date_of_event) <= end_date)\
            .group_by(Inquiry.Location_Area)\
            .order_by(func.count(Inquiry.id).desc()).all()

        return jsonify({
            'totalLeads': total_leads,
            'leadGrowthRate': round(lead_growth_rate, 2),
            'conversionRate': round(conversion_rate, 2),
            'conversionRateChange': round(conversion_rate_change, 2),
            'estimatedRevenue': estimated_revenue,
            'revenueChange': round(revenue_change, 2),
            'averageDealSize': 1000,  # Assuming a fixed deal size for simplicity
            'dealSizeChange': 0,  # Assuming no change in deal size for simplicity
            'leadTrendsData': lead_trends_data,
            'topCompanyFields': [{'field': field, 'value': count} for field, count in top_company_fields],
            'regionalDistribution': [{'region': region, 'value': count} for region, count in regional_distribution],
            'engagementMetrics': [
                {'metric': 'Confirmed Rate', 'value': round(conversion_rate, 2)},
                {'metric': 'In Progress Rate', 'value': round((sum(1 for inq in inquiries if inq.progress == 'In progress') / total_leads * 100), 2)},
                {'metric': 'New Inquiries', 'value': round((sum(1 for inq in inquiries if inq.progress == 'New') / total_leads * 100), 2)},
                #lost leads
                {'metric': 'Lost Leads', 'value': round((sum(1 for inq in inquiries if inq.progress == 'Lost') / total_leads * 100), 2)},
            ],
            'salesFunnelData': [
                {'stage': 'New', 'value': sum(1 for inq in inquiries if inq.progress == 'New')},
                {'stage': 'In Progress', 'value': sum(1 for inq in inquiries if inq.progress == 'In progress')},
                {'stage': 'Confirmed', 'value': confirmed_leads},
                {'stage': 'Lost', 'value': sum(1 for inq in inquiries if inq.progress == 'Lost')}

            ],
            'leadSourceData': [
                {'source': 'Website', 'value': 40},
                {'source': 'Referral', 'value': 30},
                {'source': 'Social Media', 'value': 20},
                {'source': 'Other', 'value': 10}
            ]  # This is dummy data, replace with actual lead source data if available
        })

    except Exception as e:
        app.logger.error(f"Error in dashboard_data: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)