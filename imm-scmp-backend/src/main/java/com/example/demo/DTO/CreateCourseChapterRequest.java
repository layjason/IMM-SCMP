package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;
import com.example.demo.DTO.UploadCourseResourceRequest;

import java.util.*;

@Getter
@Setter
public class CreateCourseChapterRequest {
    private String chapterTitle;
    private String content;
}
