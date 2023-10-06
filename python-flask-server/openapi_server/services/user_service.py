from typing import List

from openapi_server.models.user import User
from openapi_server.config_test import db
import logging

logging.basicConfig(level=logging.INFO)

class UserService:
    def create_user(username, password):
        logging.info(f"Creating user.")
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        return user

    def get_user_by_username(username):
        logging.info(f"Getting user by username.")
        return User.query.filter_by(username=username).first()