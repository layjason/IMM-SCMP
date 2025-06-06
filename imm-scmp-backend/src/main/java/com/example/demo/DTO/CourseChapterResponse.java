package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class CourseChapterResponse {
    private Long chapterId;
    private String title;
    private Integer orderIndex;
    private List<CourseResourceResponse> resources;
}
