package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import com.example.demo.DTO.CourseResourceResponse;

@Getter
@Setter
public class CourseChapterResponse {
    private String chapterId;
    private String title;
    private String content;
    private Integer orderIndex;
    private List<CourseResourceResponse> resources;
}
