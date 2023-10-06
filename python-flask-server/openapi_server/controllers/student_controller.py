import connexion
from flask import jsonify, request

from openapi_server.services.student_service import StudentService
from openapi_server.config_test import app


@app.route('/api/v3/student', methods=['POST'])
def add_student():  # noqa: E501
    """
    Services the add_student API GET call.
    """
    student = request.get_json()

    return jsonify(StudentService.add_student(student)), 200

@app.route('/api/v3/student/{student_id}', methods=['DELETE'])
def delete_student(student_id):  # noqa: E501
    """
    Services the delete_student API GET call.
    """

    return jsonify(StudentService.delete_student(student_id)), 200

@app.route('/api/v3/student/{student_id}', methods=['GET'])
def get_student(student_id):  # noqa: E501
    """
    Services the get_student API GET call.
    """

    return jsonify(StudentService.get_student(student_id)), 200

@app.route('/api/v3/student', methods=['GET'])
def get_student_lis_t():  # noqa: E501
    """
    Services the get_student_lis_t API GET call.
    """

    return "This method is not implemented as a service!"

@app.route('/api/v3/student/{student_id}', methods=['PUT'])
def update_student(student_id, ):  # noqa: E501
    """
    Services the update_student API GET call.
    """
    student = request.get_json()

    return jsonify(StudentService.update_student(student_id, student)), 200
