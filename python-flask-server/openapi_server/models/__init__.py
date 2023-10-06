# coding: utf-8

# flake8: noqa
from __future__ import absolute_import
# import models into model package
from openapi_server.models.course import Course, Course_schema, Courses_schema
from openapi_server.models.student import Student, Student_schema, Students_schema

from openapi_server.models.user import User
from openapi_server.config_test import db, app

with app.app_context():
    db.create_all()