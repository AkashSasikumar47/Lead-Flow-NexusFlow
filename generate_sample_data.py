from datetime import datetime, timedelta
from app import db, Inquiry

# Create all tables
db.create_all()

# Generate sample data
sample_data = [
    Inquiry(
        Company_Name=f'Company_{i % 5}',
        Organizer=f'Organizer_{i}',
        Location_Area=f'Region_{i % 3}',
        date_of_event=(datetime.utcnow() - timedelta(days=i)).strftime('%Y-%m-%d %H:%M:%S'),
        Pax=100 + i,
        req_food='Sample food requirement',
        email=f'user{i}@example.com',
        contact_no=f'123456789{i}',
        progress='Confirmed' if i % 2 == 0 else 'In Progress'
    ) for i in range(1, 31)  # Generate 30 sample records
]

# Add sample data to the database
db.session.bulk_save_objects(sample_data)
db.session.commit()

print("Sample data inserted successfully.")