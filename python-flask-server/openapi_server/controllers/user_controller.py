from flask import jsonify, request

from openapi_server.config_test import app
from openapi_server.services.user_service import UserService


@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = UserService.create_user(data.get('username'), data.get('password'))
    return jsonify(user.to_dict()), 201


@app.route('/users/<username>', methods=['GET'])
def get_user_by_username(username):
    user = UserService.get_user_by_username(username)
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user.to_dict()), 200