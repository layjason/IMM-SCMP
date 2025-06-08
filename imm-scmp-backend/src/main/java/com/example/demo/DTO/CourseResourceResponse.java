package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseResourceResponse {
    private String resourceId;
    private String fileName;
    private String filePath;
    private String resourceType;
    private String uploaderId;
}
