# Course

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **int64** |  | [optional] 
**Name** | Pointer to **string** |  | [optional] 
**Desc** | Pointer to **string** |  | [optional] 

## Methods

### NewCourse

`func NewCourse() *Course`

NewCourse instantiates a new Course object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCourseWithDefaults

`func NewCourseWithDefaults() *Course`

NewCourseWithDefaults instantiates a new Course object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *Course) GetId() int64`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *Course) GetIdOk() (*int64, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *Course) SetId(v int64)`

SetId sets Id field to given value.

### HasId

`func (o *Course) HasId() bool`

HasId returns a boolean if a field has been set.

### GetName

`func (o *Course) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *Course) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *Course) SetName(v string)`

SetName sets Name field to given value.

### HasName

`func (o *Course) HasName() bool`

HasName returns a boolean if a field has been set.

### GetDesc

`func (o *Course) GetDesc() string`

GetDesc returns the Desc field if non-nil, zero value otherwise.

### GetDescOk

`func (o *Course) GetDescOk() (*string, bool)`

GetDescOk returns a tuple with the Desc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDesc

`func (o *Course) SetDesc(v string)`

SetDesc sets Desc field to given value.

### HasDesc

`func (o *Course) HasDesc() bool`

HasDesc returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


