package com.example.demo.DTO;

import lombok.Data;

import java.util.*;

@Data
public class StudentAnswerResponse{
    private String assignmentId;
    private String studentId;
    private List<AnswerDetail> answers;

    @Data
    public static class AnswerDetail{
        private String questionId;
        private String answer;
        private Boolean isCorrect;
        private Integer score;
    }
}