import connexion
from flask import jsonify, request

from openapi_server.services.course_service import CourseService
from openapi_server.config_test import app


@app.route('/api/v3/course', methods=['POST'])
def add_course():  # noqa: E501
    """
    Services the add_course API GET call.
    """
    course = request.get_json()

    return jsonify(CourseService.add_course(course)), 200

@app.route('/api/v3/course/{course_id}', methods=['DELETE'])
def delete_course(course_id):  # noqa: E501
    """
    Services the delete_course API GET call.
    """

    return jsonify(CourseService.delete_course(course_id)), 200

@app.route('/api/v3/course/{course_id}', methods=['GET'])
def get_course(course_id):  # noqa: E501
    """
    Services the get_course API GET call.
    """

    return jsonify(CourseService.get_course(course_id)), 200

@app.route('/api/v3/course', methods=['GET'])
def get_course_list():  # noqa: E501
    """
    Services the get_course_list API GET call.
    """

    return jsonify(CourseService.get_course_list()), 200

@app.route('/api/v3/course/{course_id}', methods=['PUT'])
def update_course(course_id, ):  # noqa: E501
    """
    Services the update_course API GET call.
    """
    course = request.get_json()

    return jsonify(CourseService.update_course(course_id, course)), 200
