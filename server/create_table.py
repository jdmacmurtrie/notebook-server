import csv
from application import app, db
from models.page import Page

# initialize the app with Flask-SQLAlchemy
db.init_app(app)

engine = db.create_engine('sqlite:///notebook.db', echo=True)

# Create the Metadata Object
metadata_obj = db.MetaData()

# Define the profile table

# database name
notebook = db.Table(
    'pages',
    metadata_obj,
    db.Column('id', db.Integer, primary_key=True),
    db.Column('title', db.String),
    db.Column('body', db.String),
)

# Create the profile table
metadata_obj.create_all(engine)

def db_load_example_data():
    filename = 'initial_data.csv'

    with open(filename, 'r') as csvfile:
        datareader = csv.reader(csvfile)
        # skip header
        next(datareader)

        for row in datareader:
            [_, title, body] = row
            new_page = Page(title=title, body=body)

            with app.app_context():
                db.session.add(new_page)
                db.session.commit()

db_load_example_data()
