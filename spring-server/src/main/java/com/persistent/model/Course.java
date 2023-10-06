package com.persistent.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;
/**
 * Course
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2023-10-06T07:36:59.627683784Z[UTC]")
@Data
public class Course {

  private Long id;
  
  private String name;
  
  private String desc;
  


}
