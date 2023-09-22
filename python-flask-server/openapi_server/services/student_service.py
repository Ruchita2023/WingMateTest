from flask import abort, request
from openapi_server.config_test import db
from openapi_server.models.student import Student, Student_schema, Students_schema
from openapi_server.services.pagination_sorting import pagination_sorting
import logging

logging.basicConfig(level=logging.INFO)

class StudentService:

    def get_student_list():
        """
        This function retrieves paginated and sorted list of all students from the database.
      
        It returns a list of students in JSON format with a HTTP status code of 200.
        Retrieves a list of all students in the database.

        :return: The list of students.
        :rtype: list of dicts
        """
        logging.info(f"Getting students list")
        students = pagination_sorting(Student)
        if not students:
            logging.warn("No student found!")
            abort(404, "No student found")
        return Students_schema.dump(students)

    def get_student(id):
        """
        Retrieves a student by ID from the database.
        
        :param id: integer ID of the student to retrieve
        :type id: int
        :return: The student object
        :rtype: dict
        """
        logging.info(f"Getting student with ID: {id}")

        student = Student.query.filter(Student.id == id).one_or_none()
        if student is not None:
            return Student_schema.dump(student)
        else:
            if id < 1:
                logging.error(f"Invalid ID: {id}.")
            else : 
                logging.error(f"Student with ID: {id} does not exist")
            abort(404, f"Student with ID: {id} does not exist")

    def add_student(student):
        """
        Adds a new student to the database.
        The student object must contain an 'id' field, which must not already exist in the database.

        :param student: The student object to add to the database
        :type student: dict
        :return: The newly added student object
        :rtype: dict
        :raises: 400 error if a student with the same id already exists
        """
        id = student.get("id")
        logging.info(f"Adding student with ID: {id}")
        
        existing_student = Student.query.filter(Student.id == id).one_or_none()

        if existing_student is None:
            new_student = Student_schema.load(student, session=db.session)
            db.session.add(new_student)
            db.session.commit()
            logging.info(f"Successfully added student with ID : {id}")
            return Student_schema.dump(new_student)
        else:
            logging.error(f"Student with ID: {id} already exists")
            abort(400, f"Student with ID: {id} already exists")

    def update_student(student):
        """
        Update an existing student in the database with a specified id.
        
        :param id: integer ID of the student to update.
        :type id: int
        :return: The updated student object.
        :rtype: dict
        :raises: 404 error if the student is not found
        """
        id = student.get("id")
        logging.info(f"Updating student with ID: {id}")
        existing_student = Student.query.filter(Student.id == id).one_or_none()

        if existing_student:
            update_student = Student_schema.load(student, session=db.session)
            existing_student.id = update_student.id
            db.session.merge(existing_student)
            db.session.commit()
            logging.info(f"Successfully updated student with ID : {id}")
            return Student_schema.dump(existing_student)
        else:
            logging.error(f"Student with ID: {id} not found")
            abort(404, f"Student with ID: {id} not found")

    def delete_student(id):
        """
        Delete the student with the specified id.

        :param id: integer id of the student to delete
        :type id: int
        :return: success message
        :raises: 400 error if the student is not found
        """
        logging.info(f"Started processing of delete operation for ID: {id}")
        existing_student = Student.query.filter(Student.id == id).one_or_none()

        if existing_student:
            db.session.delete(existing_student)
            db.session.commit()
            logging.info(f"Successfully completed the deletion operation for ID : {id}")
            return f"Student with ID: {id} successfully deleted"
        else: 
            logging.error(f"Student with ID: {id} not present!")
            abort(400, f"Student with ID: {id} not found")

