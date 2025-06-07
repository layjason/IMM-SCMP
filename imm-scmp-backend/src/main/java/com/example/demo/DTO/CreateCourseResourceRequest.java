package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCourseResourceRequest {
    private String fileName;
    private String resourceType;
    private String filePath;
}
