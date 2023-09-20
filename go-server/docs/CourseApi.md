# \CourseApi

All URIs are relative to */api/v3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AddCourse**](CourseApi.md#AddCourse) | **Post** /course | Add a new course
[**DeleteCourse**](CourseApi.md#DeleteCourse) | **Delete** /course/{courseId} | Deletes a course
[**GetCourse**](CourseApi.md#GetCourse) | **Get** /course/{courseId} | Find course by ID
[**GetCourseList**](CourseApi.md#GetCourseList) | **Get** /course | Get list of all courses
[**UpdateCourse**](CourseApi.md#UpdateCourse) | **Put** /course/{courseId} | Update an existing course



## AddCourse

> Course AddCourse(ctx).Course(course).Execute()

Add a new course



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
    course := *openapiclient.NewCourse() // Course | Create a new course

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.CourseApi.AddCourse(context.Background()).Course(course).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `CourseApi.AddCourse``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `AddCourse`: Course
    fmt.Fprintf(os.Stdout, "Response from `CourseApi.AddCourse`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAddCourseRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **course** | [**Course**](Course.md) | Create a new course | 

### Return type

[**Course**](Course.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteCourse

> Course DeleteCourse(ctx, courseId).Execute()

Deletes a course



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
    courseId := int64(789) // int64 | Course id to delete

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.CourseApi.DeleteCourse(context.Background(), courseId).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `CourseApi.DeleteCourse``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeleteCourse`: Course
    fmt.Fprintf(os.Stdout, "Response from `CourseApi.DeleteCourse`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **int64** | Course id to delete | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteCourseRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**Course**](Course.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetCourse

> Course GetCourse(ctx, courseId).Execute()

Find course by ID



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
    courseId := int64(789) // int64 | ID of course to return

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.CourseApi.GetCourse(context.Background(), courseId).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `CourseApi.GetCourse``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetCourse`: Course
    fmt.Fprintf(os.Stdout, "Response from `CourseApi.GetCourse`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **int64** | ID of course to return | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetCourseRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**Course**](Course.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetCourseList

> []Course GetCourseList(ctx).Execute()

Get list of all courses



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
    resp, r, err := apiClient.CourseApi.GetCourseList(context.Background()).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `CourseApi.GetCourseList``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetCourseList`: []Course
    fmt.Fprintf(os.Stdout, "Response from `CourseApi.GetCourseList`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetCourseListRequest struct via the builder pattern


### Return type

[**[]Course**](Course.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateCourse

> Course UpdateCourse(ctx, courseId).Course(course).Execute()

Update an existing course



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
    courseId := int64(789) // int64 | Course id to delete
    course := *openapiclient.NewCourse() // Course | Update an existent course

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.CourseApi.UpdateCourse(context.Background(), courseId).Course(course).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `CourseApi.UpdateCourse``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `UpdateCourse`: Course
    fmt.Fprintf(os.Stdout, "Response from `CourseApi.UpdateCourse`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**courseId** | **int64** | Course id to delete | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateCourseRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **course** | [**Course**](Course.md) | Update an existent course | 

### Return type

[**Course**](Course.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

