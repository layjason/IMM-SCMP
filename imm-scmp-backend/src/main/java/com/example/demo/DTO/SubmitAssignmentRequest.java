package com.example.demo.DTO;

import java.util.*;
import lombok.*;

@Data
public class SubmitAssignmentRequest{
    public String assignmentId;
    public List<AnswerData> questions;

    @Data
    public static class AnswerData{
        public String questionId;
        public String answer;
    }
}