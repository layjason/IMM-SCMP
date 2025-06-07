package com.example.demo.DTO.Course;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UploadCourseResourceRequest {
    private Integer courseId;
    private String resourceName;
    private String resourceUrl;
}
