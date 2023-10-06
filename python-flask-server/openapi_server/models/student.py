# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from openapi_server.config_test import db, ma


class Student(db.Model):
    """Student - a model defined in OpenAPI

    :param id: The id of this Student.  # noqa: E501
    :param name: The name of this Student.  # noqa: E501
    :param address: The address of this Student.  # noqa: E501
    :param email: The email of this Student.  # noqa: E501
    :param phone: The phone of this Student.  # noqa: E501
    """
    __tablename__ = 'Student'
    id = db.Column(db.Integer
, primary_key=True)
    name = db.Column(db.String
, nullable=False)
    address = db.Column(db.String
, nullable=False)
    email = db.Column(db.String
, nullable=False)
    phone = db.Column(db.String
, nullable=False)

'''
Serialize the Modeled Data With Marshmallow
Marshmallow finds attributes in the CourseController class and learns the types of those attributes 
so it knows how to serialize and deserialize them
'''
class StudentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Student
        load_instance = True
        sqla_session = db.session

Student_schema = StudentSchema()
Students_schema = StudentSchema(many=True)

