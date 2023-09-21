/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech) (6.3.0-SNAPSHOT).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
package com.persistent.api;

import com.persistent.model.Student;
import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.annotation.Generated;
import com.persistent.util.Constants;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2023-09-21T05:24:56.683917375Z[UTC]")
@Validated
@Tag(name = "student", description = "Operations about student")
public interface StudentApi {

    default Optional<NativeWebRequest> getRequest() {
        return Optional.empty();
    }

    /**
     * POST /student : Add a new student
     * Add a new student
     *
     * @param student Create a new student (required)
     * @return Successful operation (status code 200)
     *         or Invalid input (status code 405)
     */
    @Operation(
        operationId = "addStudent",
        summary = "Add a new student",
        description = "Add a new student",
        tags = { "student" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Student.class)),
                @Content(mediaType = "application/xml", schema = @Schema(implementation = Student.class))
            }),
            @ApiResponse(responseCode = "405", description = "Invalid input")
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/student",
        produces = { "application/json", "application/xml" },
        consumes = { "application/json" }
    )
    default ResponseEntity<Student> addStudent(
        @Parameter(name = "Student", description = "Create a new student", required = true) @Valid @RequestBody Student student
    ) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"address\" : \"Pune\", \"phone\" : \"1234567890\", \"name\" : \"Ramesh\", \"id\" : 1, \"email\" : \"ramesh@email.com\" }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/xml"))) {
                    String exampleString = "<student> <id>1</id> <name>Ramesh</name> <address>Pune</address> <email>ramesh@email.com</email> <phone>1234567890</phone> </student>";
                    ApiUtil.setExampleResponse(request, "application/xml", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

    /**
     * DELETE /student/{studentId} : Deletes a student
     * delete a student
     *
     * @param studentId Student id to delete (required)
     * @return successful operation (status code 200)
     *         or Invalid student value (status code 400)
     */
    @Operation(
        operationId = "deleteStudent",
        summary = "Deletes a student",
        description = "delete a student",
        tags = { "student" },
        responses = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Student.class))
            }),
            @ApiResponse(responseCode = "400", description = "Invalid student value")
        }
    )
    @RequestMapping(
        method = RequestMethod.DELETE,
        value = "/student/{studentId}",
        produces = { "application/json" }
    )
    default ResponseEntity<Student> deleteStudent(
        @Parameter(name = "studentId", description = "Student id to delete", required = true, in = ParameterIn.PATH) @PathVariable("studentId") Long studentId
    ) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"address\" : \"Pune\", \"phone\" : \"1234567890\", \"name\" : \"Ramesh\", \"id\" : 1, \"email\" : \"ramesh@email.com\" }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

    /**
     * GET /student/{studentId} : Find student by ID
     * Returns a single student
     *
     * @param studentId ID of student to return (required)
     * @return successful operation (status code 200)
     *         or Invalid ID supplied (status code 400)
     *         or Student not found (status code 404)
     */
    @Operation(
        operationId = "getStudent",
        summary = "Find student by ID",
        description = "Returns a single student",
        tags = { "student" },
        responses = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Student.class))
            }),
            @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
            @ApiResponse(responseCode = "404", description = "Student not found")
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/student/{studentId}",
        produces = { "application/json" }
    )
    default ResponseEntity<Student> getStudent(
        @Parameter(name = "studentId", description = "ID of student to return", required = true, in = ParameterIn.PATH) @PathVariable("studentId") Long studentId
    ) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"address\" : \"Pune\", \"phone\" : \"1234567890\", \"name\" : \"Ramesh\", \"id\" : 1, \"email\" : \"ramesh@email.com\" }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

    /**
     * GET /student : Get list of all students
     * Returns list of students
     *
     * @return successful operation (status code 200)
     *         or Invalid ID supplied (status code 400)
     *         or Student not found (status code 404)
     */
    @Operation(
        operationId = "getStudentLisT",
        summary = "Get list of all students",
        description = "Returns list of students",
        tags = { "student" },
        responses = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Student.class)))
            }),
            @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
            @ApiResponse(responseCode = "404", description = "Student not found")
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/student",
        produces = { "application/json" }
    )
    default ResponseEntity<List<Student>> getStudentLisT(
        @RequestParam(value = "query_string", defaultValue = Constants.DEFAULT_SEARCH_CRITERIA, required = false) String queryString,
        @RequestParam(value = "pageNumber", defaultValue = Constants.DEFAULT_PAGE_NUMBER, required = false) Integer pageNumber,
        @RequestParam(value = "pageSize", defaultValue = Constants.DEFAULT_PAGE_SIZE, required = false) Integer pageSize,
        @RequestParam(value = "sortBy", defaultValue = Constants.DEFAULT_SORT_BY, required = false) String sortBy,
        @RequestParam(value = "sortDir", defaultValue = Constants.DEFAULT_SORT_DIR, required = false) String sortDir
        
    ) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "[ { \"address\" : \"Pune\", \"phone\" : \"1234567890\", \"name\" : \"Ramesh\", \"id\" : 1, \"email\" : \"ramesh@email.com\" }, { \"address\" : \"Pune\", \"phone\" : \"1234567890\", \"name\" : \"Ramesh\", \"id\" : 1, \"email\" : \"ramesh@email.com\" } ]";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

    /**
     * PUT /student/{studentId} : Update an existing student
     * Update an existing student by Id
     *
     * @param studentId Student id to delete (required)
     * @param student Update an existent student (required)
     * @return Successful operation (status code 200)
     *         or Invalid ID supplied (status code 400)
     *         or Student not found (status code 404)
     *         or Validation exception (status code 405)
     */
    @Operation(
        operationId = "updateStudent",
        summary = "Update an existing student",
        description = "Update an existing student by Id",
        tags = { "student" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = Student.class))
            }),
            @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
            @ApiResponse(responseCode = "404", description = "Student not found"),
            @ApiResponse(responseCode = "405", description = "Validation exception")
        }
    )
    @RequestMapping(
        method = RequestMethod.PUT,
        value = "/student/{studentId}",
        produces = { "application/json" },
        consumes = { "application/json" }
    )
    default ResponseEntity<Student> updateStudent(
        @Parameter(name = "studentId", description = "Student id to delete", required = true, in = ParameterIn.PATH) @PathVariable("studentId") Long studentId,
        @Parameter(name = "Student", description = "Update an existent student", required = true) @Valid @RequestBody Student student
    ) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"address\" : \"Pune\", \"phone\" : \"1234567890\", \"name\" : \"Ramesh\", \"id\" : 1, \"email\" : \"ramesh@email.com\" }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }
}
