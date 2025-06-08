package com.example.demo.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadCourseResourceRequest{
    private String chapterId;
    private String uploaderId;
    private String resourceType;
}