""" read from a SQLite database and return data """

import os.path
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import csv
from sqlalchemy.sql import text
from sqlalchemy.orm import DeclarativeBase
from flask_cors import CORS

# from example_data import db_load_example_data
# from models.Page import Page

# this variable, db, will be used for all SQLAlchemy commands
db = SQLAlchemy()
# create the app
app = Flask(__name__)

CORS(app, resources={r'/*': {'origins': '*'}})

# change string to the name of your database; add path if necessary
db_name = 'notebook.db'
# note - path is necessary for a SQLite db!!!
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, db_name)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# initialize the app with Flask-SQLAlchemy
db.init_app(app)


class Base(DeclarativeBase):
    pass

class Page(db.Model):

    __tablename__ = 'Pages'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    body = db.Column(nullable=False)

# def db_load_example_data():
#     filename = 'initial_data.csv'

#     with open(filename, 'r') as csvfile:
#         datareader = csv.reader(csvfile)
#         for row in datareader:
#             [_, title, body] = row
#             new_page = Page(title=title, body=body)

#             with app.app_context():
#                 db.session.add(new_page)
#                 db.session.commit()

@app.route('/')
def testdb():
    try:
        pages = db.session.execute(db.select(Page)).scalars().all()
        print(pages)
        response = []

        for page in pages:
            obj = {
                'title': page.title,
                'body': page.body,
            }
            response.append(obj)

        return response

    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

if __name__ == '__main__':
    app.run(debug=True)
