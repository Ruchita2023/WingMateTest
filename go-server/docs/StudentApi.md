# \StudentApi

All URIs are relative to */api/v3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AddStudent**](StudentApi.md#AddStudent) | **Post** /student | Add a new student
[**DeleteStudent**](StudentApi.md#DeleteStudent) | **Delete** /student/{studentId} | Deletes a student
[**GetStudent**](StudentApi.md#GetStudent) | **Get** /student/{studentId} | Find student by ID
[**GetStudentLisT**](StudentApi.md#GetStudentLisT) | **Get** /student | Get list of all students
[**UpdateStudent**](StudentApi.md#UpdateStudent) | **Put** /student/{studentId} | Update an existing student



## AddStudent

> Student AddStudent(ctx).Student(student).Execute()

Add a new student



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    student := *openapiclient.NewStudent() // Student | Create a new student

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.StudentApi.AddStudent(context.Background()).Student(student).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `StudentApi.AddStudent``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `AddStudent`: Student
    fmt.Fprintf(os.Stdout, "Response from `StudentApi.AddStudent`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAddStudentRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **student** | [**Student**](Student.md) | Create a new student | 

### Return type

[**Student**](Student.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json, application/xml

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteStudent

> Student DeleteStudent(ctx, studentId).Execute()

Deletes a student



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    studentId := int64(789) // int64 | Student id to delete

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.StudentApi.DeleteStudent(context.Background(), studentId).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `StudentApi.DeleteStudent``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeleteStudent`: Student
    fmt.Fprintf(os.Stdout, "Response from `StudentApi.DeleteStudent`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**studentId** | **int64** | Student id to delete | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteStudentRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**Student**](Student.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetStudent

> Student GetStudent(ctx, studentId).Execute()

Find student by ID



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    studentId := int64(789) // int64 | ID of student to return

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.StudentApi.GetStudent(context.Background(), studentId).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `StudentApi.GetStudent``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetStudent`: Student
    fmt.Fprintf(os.Stdout, "Response from `StudentApi.GetStudent`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**studentId** | **int64** | ID of student to return | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetStudentRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**Student**](Student.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetStudentLisT

> []Student GetStudentLisT(ctx).Execute()

Get list of all students



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.StudentApi.GetStudentLisT(context.Background()).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `StudentApi.GetStudentLisT``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetStudentLisT`: []Student
    fmt.Fprintf(os.Stdout, "Response from `StudentApi.GetStudentLisT`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetStudentLisTRequest struct via the builder pattern


### Return type

[**[]Student**](Student.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateStudent

> Student UpdateStudent(ctx, studentId).Student(student).Execute()

Update an existing student



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    studentId := int64(789) // int64 | Student id to delete
    student := *openapiclient.NewStudent() // Student | Update an existent student

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.StudentApi.UpdateStudent(context.Background(), studentId).Student(student).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `StudentApi.UpdateStudent``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `UpdateStudent`: Student
    fmt.Fprintf(os.Stdout, "Response from `StudentApi.UpdateStudent`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**studentId** | **int64** | Student id to delete | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateStudentRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **student** | [**Student**](Student.md) | Update an existent student | 

### Return type

[**Student**](Student.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

