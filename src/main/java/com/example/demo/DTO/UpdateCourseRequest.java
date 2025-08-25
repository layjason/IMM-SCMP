package com.example.demo.DTO;

import com.example.demo.Model.Course.Course.AssessmentMethod;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCourseRequest {
    private String courseName;
    private String syllabus;
    private String objective;
    private AssessmentMethod assessmentMethod;
}
