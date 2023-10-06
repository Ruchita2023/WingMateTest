from flask import abort, request
from openapi_server.config_test import db
from openapi_server.models.course import Course, Course_schema, Courses_schema
from openapi_server.services.pagination_sorting import pagination_sorting
import logging

logging.basicConfig(level=logging.INFO)

class CourseService:

    def get_course_list():
        """
        This function retrieves paginated and sorted list of all courses from the database.
      
        It returns a list of courses in JSON format with a HTTP status code of 200.
        Retrieves a list of all courses in the database.

        :return: The list of courses.
        :rtype: list of dicts
        """
        logging.info(f"Getting courses list")
        courses = pagination_sorting(Course)
        if not courses:
            logging.warn("No course found!")
            abort(404, "No course found")
        return Courses_schema.dump(courses)

    def get_course(id):
        """
        Retrieves a course by ID from the database.
        
        :param id: integer ID of the course to retrieve
        :type id: int
        :return: The course object
        :rtype: dict
        """
        logging.info(f"Getting course with ID: {id}")

        course = Course.query.filter(Course.id == id).one_or_none()
        if course is not None:
            return Course_schema.dump(course)
        else:
            if id < 1:
                logging.error(f"Invalid ID: {id}.")
            else : 
                logging.error(f"Course with ID: {id} does not exist")
            abort(404, f"Course with ID: {id} does not exist")

    def add_course(course):
        """
        Adds a new course to the database.
        The course object must contain an 'id' field, which must not already exist in the database.

        :param course: The course object to add to the database
        :type course: dict
        :return: The newly added course object
        :rtype: dict
        :raises: 400 error if a course with the same id already exists
        """
        id = course.get("id")
        logging.info(f"Adding course with ID: {id}")
        
        existing_course = Course.query.filter(Course.id == id).one_or_none()

        if existing_course is None:
            new_course = Course_schema.load(course, session=db.session)
            db.session.add(new_course)
            db.session.commit()
            logging.info(f"Successfully added course with ID : {id}")
            return Course_schema.dump(new_course)
        else:
            logging.error(f"Course with ID: {id} already exists")
            abort(400, f"Course with ID: {id} already exists")

    def update_course(course):
        """
        Update an existing course in the database with a specified id.
        
        :param id: integer ID of the course to update.
        :type id: int
        :return: The updated course object.
        :rtype: dict
        :raises: 404 error if the course is not found
        """
        id = course.get("id")
        logging.info(f"Updating course with ID: {id}")
        existing_course = Course.query.filter(Course.id == id).one_or_none()

        if existing_course:
            update_course = Course_schema.load(course, session=db.session)
            existing_course.id = update_course.id
            db.session.merge(existing_course)
            db.session.commit()
            logging.info(f"Successfully updated course with ID : {id}")
            return Course_schema.dump(existing_course)
        else:
            logging.error(f"Course with ID: {id} not found")
            abort(404, f"Course with ID: {id} not found")

    def delete_course(id):
        """
        Delete the course with the specified id.

        :param id: integer id of the course to delete
        :type id: int
        :return: success message
        :raises: 400 error if the course is not found
        """
        logging.info(f"Started processing of delete operation for ID: {id}")
        existing_course = Course.query.filter(Course.id == id).one_or_none()

        if existing_course:
            db.session.delete(existing_course)
            db.session.commit()
            logging.info(f"Successfully completed the deletion operation for ID : {id}")
            return f"Course with ID: {id} successfully deleted"
        else: 
            logging.error(f"Course with ID: {id} not present!")
            abort(400, f"Course with ID: {id} not found")

