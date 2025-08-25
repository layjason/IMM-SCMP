package com.example.demo.DTO;

import com.example.demo.DTO.*;
import com.example.demo.Model.Course.Course.AssessmentMethod;

import java.util.*;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
@SuppressWarnings("unused")
@Getter
@Setter
public class CourseDetailResponse {
    private String courseId;
    private String courseName;
    private String courseCode;
    private String syllabus;
    private String objective;
    private AssessmentMethod assessmentMethod;
    private String creatorId;
    private LocalDateTime createdTime;
    private List<CourseChapterResponse> chapters;
}
