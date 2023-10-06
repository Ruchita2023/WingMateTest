"""
This file initializes a Flask application with a Connexion specification and sets up a SQLite database using SQLAlchemy.

The app is created with Flask's __init__ method and is then passed to a Connexion application object, which uses a YAML or JSON specification file to automatically generate routes for the API.

The SQLite database is created using SQLAlchemy and is connected to the Flask app using app.config. The database can be accessed using the SQLAlchemy object `db`, and data can be serialized/deserialized using `ma`.
"""

import os
import pathlib
import connexion
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask import Flask

app = Flask(__name__)
basedir = pathlib.Path(__file__).parent.resolve()
connex_app = connexion.App(__name__, specification_dir='./openapi/')

app = connex_app.app
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + os.path.join(os.path.dirname(__file__), '..', 'database.db')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "my_secret_key"

db = SQLAlchemy(app)
ma = Marshmallow(app)
