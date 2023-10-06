# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.student import Student  # noqa: E501
from openapi_server.test import BaseTestCase


class TestStudent(BaseTestCase):
    """Student integration test stubs"""

    def test_add_student(self):
        """Test case for add_student

        Add a new student
        """
        student = {"address":"Pune","phone":"1234567890","name":"Ramesh","id":1,"email":"ramesh@email.com"}
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/api/v3/student',
            method='POST',
            headers=headers,
            data=json.dumps(student),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_delete_student(self):
        """Test case for delete_student

        Deletes a student
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/api/v3/student/{student_id}'.format(student_id=56),
            method='DELETE',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_student(self):
        """Test case for get_student

        Find student by ID
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/api/v3/student/{student_id}'.format(student_id=56),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_student_lis_t(self):
        """Test case for get_student_lis_t

        Get list of all students
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/api/v3/student',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_update_student(self):
        """Test case for update_student

        Update an existing student
        """
        student = {"address":"Pune","phone":"1234567890","name":"Ramesh","id":1,"email":"ramesh@email.com"}
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/api/v3/student/{student_id}'.format(student_id=56),
            method='PUT',
            headers=headers,
            data=json.dumps(student),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
