from flask_sqlalchemy import SQLAlchemy
import csv
from app import Page, app
import os.path
from flask import Flask, jsonify

db = SQLAlchemy()
app = Flask(__name__)
# change string to the name of your database; add path if necessary
db_name = 'notebook.db'
# note - path is necessary for a SQLite db!!!
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, db_name)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True



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
