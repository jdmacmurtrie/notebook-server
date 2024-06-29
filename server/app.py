""" read from a SQLite database and return data """

import os.path
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()
app = Flask(__name__)

CORS(app, resources={r'/*': {'origins': '*'}})

db_name = 'notebook.db'
# note - path is necessary for a SQLite db!!!
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, db_name)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# initialize the app with Flask-SQLAlchemy
db.init_app(app)

# @app.route('/')
# def hello_world():
#     return 'hello world'

if __name__ == '__main__':
    app.run(debug=True)
