# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from openapi_server.config_test import db, ma


class Course(db.Model):
    """Course - a model defined in OpenAPI

    :param id: The id of this Course.  # noqa: E501
    :param name: The name of this Course.  # noqa: E501
    :param desc: The desc of this Course.  # noqa: E501
    """
    __tablename__ = 'Course'
    id = db.Column(db.Integer
, primary_key=True)
    name = db.Column(db.String
, nullable=False)
    desc = db.Column(db.String
, nullable=False)

'''
Serialize the Modeled Data With Marshmallow
Marshmallow finds attributes in the CourseController class and learns the types of those attributes 
so it knows how to serialize and deserialize them
'''
class CourseSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Course
        load_instance = True
        sqla_session = db.session

Course_schema = CourseSchema()
Courses_schema = CourseSchema(many=True)

