/**
 * Controller class for handling CRUD operations on Student resource.
 */
package com.persistent.api;
import com.persistent.model.Student;

import com.persistent.model.Student;
import com.persistent.model.StudentDto;
import com.persistent.service.StudentService;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.web.context.request.NativeWebRequest;

import javax.validation.constraints.*;
import javax.validation.Valid;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.annotation.Generated;
import com.persistent.util.Constants;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2023-09-22T12:28:35.836938783Z[UTC]")
@Controller
@RequestMapping("${openapi.swaggerStudentManagementSystemOpenAPI30.base-path:/api/v3}")
public class StudentApiController implements StudentApi {

    private final NativeWebRequest request;

    /**
     * Service instance for database operations.
     */
    @Autowired
    private StudentService studentService;

    @Autowired
    public StudentApiController(NativeWebRequest request) {
        this.request = request;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    /**
     * Services the addStudent API POST call.
     * @return The Student object with the API call response and appropriate HTTP 
     *         Status code.
     */
    @Override
    public ResponseEntity<Student> addStudent(@Parameter(name = "Student", description = "Create a new student", required = true) @Valid @RequestBody Student student
    ){
        StudentDto studentdto = new StudentDto(student);
        StudentDto processedstudent = studentService.addStudent(studentdto);  
        return new ResponseEntity<Student>(processedstudent.toEntity(),HttpStatus.OK);
    }
    /**
     * Services the deleteStudent API DELETE call.
     * @return The Student object with the API call response and appropriate HTTP 
     *         Status code.
     */
    @Override
    public ResponseEntity<Student> deleteStudent(@Parameter(name = "studentId", description = "Student id to delete", required = true, in = ParameterIn.PATH) @PathVariable("studentId") Long studentId
    ){
        StudentDto processedstudent = studentService.deleteStudent(studentId);  
        return new ResponseEntity<Student>(processedstudent.toEntity(),HttpStatus.OK);
    }
    /**
     * Services the getStudent API GET call.
     * @return The Student object with the API call response and appropriate HTTP 
     *         Status code.
     */
    @Override
    public ResponseEntity<Student> getStudent(@Parameter(name = "studentId", description = "ID of student to return", required = true, in = ParameterIn.PATH) @PathVariable("studentId") Long studentId
    ){
        StudentDto processedstudent = studentService.getStudent(studentId);  
        return new ResponseEntity<Student>(processedstudent.toEntity(),HttpStatus.OK);
    }
    /**
     * Services the getStudentLisT API GET call.
     * @return The Student object with the API call response and appropriate HTTP 
     *         Status code.
     */
    @Override
    public ResponseEntity<List<Student>> getStudentLisT(
        @RequestParam(value = "query_string", defaultValue = Constants.DEFAULT_SEARCH_CRITERIA, required = false) String queryString,
        @RequestParam(value = "pageNumber", defaultValue = Constants.DEFAULT_PAGE_NUMBER, required = false) Integer pageNumber,
        @RequestParam(value = "pageSize", defaultValue = Constants.DEFAULT_PAGE_SIZE, required = false) Integer pageSize,
        @RequestParam(value = "sortBy", defaultValue = Constants.DEFAULT_SORT_BY, required = false) String sortBy,
        @RequestParam(value = "sortDir", defaultValue = Constants.DEFAULT_SORT_DIR, required = false) String sortDir
    ){
            return new ResponseEntity<List<Student>>(HttpStatus.NOT_IMPLEMENTED);
    }
    /**
     * Services the updateStudent API PUT call.
     * @return The Student object with the API call response and appropriate HTTP 
     *         Status code.
     */
    @Override
    public ResponseEntity<Student> updateStudent(@Parameter(name = "studentId", description = "Student id to delete", required = true, in = ParameterIn.PATH) @PathVariable("studentId") Long studentId,@Parameter(name = "Student", description = "Update an existent student", required = true) @Valid @RequestBody Student student
    ){
        StudentDto processedstudent = studentService.updateStudent(studentId, student);  
        return new ResponseEntity<Student>(processedstudent.toEntity(),HttpStatus.OK);
        StudentDto processedstudent = studentService.updateStudent(studentId, student);  
        return new ResponseEntity<Student>(processedstudent.toEntity(),HttpStatus.OK);
    }
}
