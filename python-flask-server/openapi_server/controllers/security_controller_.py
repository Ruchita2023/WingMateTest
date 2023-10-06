from typing import List
from datetime import datetime, timedelta

import jwt
from flask import current_app as app, jsonify, request

from openapi_server.models.user import User
from openapi_server.services.user_service import UserService

import logging
logging.basicConfig(level=logging.INFO)

def authenticate(username, password):
    """
    This function is called to authenticate a user when he/she is trying to login
    """
    logging.info(f"Authenticating User!!!")
    user = UserService.get_user_by_username(username)
    if user and user.check_password(password):
        return user

def create_token(user_id):
    """
    This function is used to create a JWT token for the authenticated user
    """
    logging.info(f"Creating token to authenticated user.")
    # Set the expiration time for the token
    expires = datetime.utcnow() + timedelta(hours=app.config.get("JWT_EXPIRATION_HOURS", 24))

     # Create the token payload
    payload = {
        "sub": user_id,
        "iat": datetime.utcnow(),
        "exp": expires
    }

    # Create the JWT token using the secret key
    token = jwt.encode(payload, app.config.get("JWT_SECRET_KEY").encode('utf-8'), algorithm="HS256")
    return token

def authorize(token):
    """
    This function is called to authorize a user based on the JWT token
    """
    try:
        # Decode the JWT token using the secret key
        payload = jwt.decode(token, app.config.get("JWT_SECRET_KEY"), algorithms=["HS256"])

        # Get the user ID from the token payload
        user_id = payload.get("sub")

        # Get the user object from the database using the user ID
        user = User.query.get(user_id)

        return user

    except jwt.ExpiredSignatureError:
        # If the token has expired, return None
        logging.warn(f"Token has expired!")
        return None

    except jwt.InvalidTokenError:
        # If the token is invalid, return None
        logging.warn(f"Token is invalid!")
        return None

def login():
    """
    This function is used to authenticate the user and generate the JWT token
    """
    # Get the username and password from the request body
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Authenticate the user using the username and password
    user = authenticate(username, password)

    if user:
        # If the user is authenticated, create the JWT token
        token = create_token(user.id)

        # Return the token in the response body
        logging.warn(f"Token genrated successfully!")
        return jsonify({"token": token})

    # If the user is not authenticated, return an error message
    logging.warn(f"Token not genrated : Invalid username or password!")
    return jsonify({"message": "Invalid username or password"}), 401

