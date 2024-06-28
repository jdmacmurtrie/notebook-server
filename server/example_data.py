# from models.page import Page
from sqlalchemy import create_engine, Column, Integer, String, DateTime
# from sqlalchemy.ext.declarative import declarative_base
from dataclasses import dataclass
from sqlalchemy.orm import DeclarativeBase
from flask_sqlalchemy import SQLAlchemy


import csv

db = SQLAlchemy()

# filename = 'initial_data.csv'

# with open(filename, 'r') as csvfile:
#     datareader = csv.reader(csvfile)
#     for row in datareader:
#         print(row)

class Base(DeclarativeBase):
    pass

class Page(db.Model):
    __tablename__ = 'Pages'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    body = db.Column(nullable=False)

def db_load_example_data(app, db):
    filename = 'initial_data.csv'

    with open(filename, 'r') as csvfile:
        datareader = csv.reader(csvfile)
        # skip header
        next(datareader)
        for row in datareader:
            [id, title, body] = row
            new_page = Page(id, title, body)

            with app.app_context():
                db.session.add(new_page)
                db.commit()