/*
 * Swagger Student Management System - OpenAPI 3.0
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * API version: 1.0.11
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

// StudentApiController binds http requests to an api service and writes the service results to the http response
type StudentApiController struct {
	service StudentApiServicer
	errorHandler ErrorHandler
}

// StudentApiOption for how the controller is set up.
type StudentApiOption func(*StudentApiController)

// WithStudentApiErrorHandler inject ErrorHandler into controller
func WithStudentApiErrorHandler(h ErrorHandler) StudentApiOption {
	return func(c *StudentApiController) {
		c.errorHandler = h
	}
}

// NewStudentApiController creates a default api controller
func NewStudentApiController(s StudentApiServicer, opts ...StudentApiOption) Router {
	controller := &StudentApiController{
		service:      s,
		errorHandler: DefaultErrorHandler,
	}

	for _, opt := range opts {
		opt(controller)
	}

	return controller
}

// Routes returns all the api routes for the StudentApiController
func (c *StudentApiController) Routes() Routes {
	return Routes{ 
		{
			"AddStudent",
			strings.ToUpper("Post"),
			"/api/v3/student",
			c.AddStudent,
		},
		{
			"DeleteStudent",
			strings.ToUpper("Delete"),
			"/api/v3/student/{studentId}",
			c.DeleteStudent,
		},
		{
			"GetStudent",
			strings.ToUpper("Get"),
			"/api/v3/student/{studentId}",
			c.GetStudent,
		},
		{
			"GetStudentLisT",
			strings.ToUpper("Get"),
			"/api/v3/student",
			c.GetStudentLisT,
		},
		{
			"UpdateStudent",
			strings.ToUpper("Put"),
			"/api/v3/student/{studentId}",
			c.UpdateStudent,
		},
	}
}

// AddStudent - Add a new student
func (c *StudentApiController) AddStudent(w http.ResponseWriter, r *http.Request) {
	studentParam := Student{}
	d := json.NewDecoder(r.Body)
	d.DisallowUnknownFields()
	if err := d.Decode(&studentParam); err != nil {
		c.errorHandler(w, r, &ParsingError{Err: err}, nil)
		return
	}
	if err := AssertStudentRequired(studentParam); err != nil {
		c.errorHandler(w, r, err, nil)
		return
	}
	result, err := c.service.AddStudent(r.Context(), studentParam)
	// If an error occurred, encode the error with the status code
	if err != nil {
		c.errorHandler(w, r, err, &result)
		return
	}
	// If no error, encode the body and the result code
	EncodeJSONResponse(result.Body, &result.Code, w)

}

// DeleteStudent - Deletes a student
func (c *StudentApiController) DeleteStudent(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	studentIdParam, err := parseInt64Parameter(params["studentId"], true)
	if err != nil {
		c.errorHandler(w, r, &ParsingError{Err: err}, nil)
		return
	}

	result, err := c.service.DeleteStudent(r.Context(), studentIdParam)
	// If an error occurred, encode the error with the status code
	if err != nil {
		c.errorHandler(w, r, err, &result)
		return
	}
	// If no error, encode the body and the result code
	EncodeJSONResponse(result.Body, &result.Code, w)

}

// GetStudent - Find student by ID
func (c *StudentApiController) GetStudent(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	studentIdParam, err := parseInt64Parameter(params["studentId"], true)
	if err != nil {
		c.errorHandler(w, r, &ParsingError{Err: err}, nil)
		return
	}

	result, err := c.service.GetStudent(r.Context(), studentIdParam)
	// If an error occurred, encode the error with the status code
	if err != nil {
		c.errorHandler(w, r, err, &result)
		return
	}
	// If no error, encode the body and the result code
	EncodeJSONResponse(result.Body, &result.Code, w)

}

// GetStudentLisT - Get list of all students
func (c *StudentApiController) GetStudentLisT(w http.ResponseWriter, r *http.Request) {
	result, err := c.service.GetStudentLisT(r.Context())
	// If an error occurred, encode the error with the status code
	if err != nil {
		c.errorHandler(w, r, err, &result)
		return
	}
	// If no error, encode the body and the result code
	EncodeJSONResponse(result.Body, &result.Code, w)

}

// UpdateStudent - Update an existing student
func (c *StudentApiController) UpdateStudent(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	studentIdParam, err := parseInt64Parameter(params["studentId"], true)
	if err != nil {
		c.errorHandler(w, r, &ParsingError{Err: err}, nil)
		return
	}

	studentParam := Student{}
	d := json.NewDecoder(r.Body)
	d.DisallowUnknownFields()
	if err := d.Decode(&studentParam); err != nil {
		c.errorHandler(w, r, &ParsingError{Err: err}, nil)
		return
	}
	if err := AssertStudentRequired(studentParam); err != nil {
		c.errorHandler(w, r, err, nil)
		return
	}
	result, err := c.service.UpdateStudent(r.Context(), studentIdParam, studentParam)
	// If an error occurred, encode the error with the status code
	if err != nil {
		c.errorHandler(w, r, err, &result)
		return
	}
	// If no error, encode the body and the result code
	EncodeJSONResponse(result.Body, &result.Code, w)

}
