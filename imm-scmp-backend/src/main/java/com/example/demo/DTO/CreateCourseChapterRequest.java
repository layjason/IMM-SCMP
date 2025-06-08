package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
public class CreateCourseChapterRequest {
    private String chapterTitle;
    private String content;
    private List<CreateCourseResourceRequest> resources;
}
