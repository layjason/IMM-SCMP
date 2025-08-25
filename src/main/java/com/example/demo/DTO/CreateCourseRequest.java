package com.example.demo.DTO;

import com.example.demo.Model.Course.Course.AssessmentMethod;
import com.example.demo.DTO.CreateCourseChapterRequest;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@SuppressWarnings("unused")
@Getter
@Setter
public class CreateCourseRequest {
    private String courseName;
    private String courseCode;
    private String syllabus;
    private String objective;
    private AssessmentMethod assessmentMethod;
    private List<CreateCourseChapterRequest> chapters;
}
