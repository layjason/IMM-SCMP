package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentProgressDTO {
    private String studentId;
    private String classId;
    private double courseCompletionRate;
    private boolean assignmentSubmitted;
    private String lastActiveDate;
}