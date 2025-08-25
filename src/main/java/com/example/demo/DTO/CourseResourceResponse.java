package com.example.demo.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseResourceResponse{
    private String resourceId;
    private String fileName;
    private String resourceType;
    private String filePath;
    private String chapterId;
    private String uploaderId;
}