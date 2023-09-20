# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.course import Course  # noqa: E501
from openapi_server.test import BaseTestCase


class TestCourse(BaseTestCase):
    """Course integration test stubs"""

    def test_add_course(self):
        """Test case for add_course

        Add a new course
        """
        course = {"name":"name","id":1,"desc":"desc"}
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/api/v3/course',
            method='POST',
            headers=headers,
            data=json.dumps(course),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_delete_course(self):
        """Test case for delete_course

        Deletes a course
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/api/v3/course/{course_id}'.format(course_id=56),
            method='DELETE',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_course(self):
        """Test case for get_course

        Find course by ID
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/api/v3/course/{course_id}'.format(course_id=56),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_course_list(self):
        """Test case for get_course_list

        Get list of all courses
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/api/v3/course',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_update_course(self):
        """Test case for update_course

        Update an existing course
        """
        course = {"name":"name","id":1,"desc":"desc"}
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/api/v3/course/{course_id}'.format(course_id=56),
            method='PUT',
            headers=headers,
            data=json.dumps(course),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
