package com.example.demo.DTO;

import java.time.LocalDate;
import java.util.List;

import lombok.*;

@Data
public class CreateAssignmentWithQuestionsRequest {
    public String title;
    public LocalDate endDate;

    public List<McqQuestionData> mcqQuestions;
    public List<CodingQuestionData> codingQuestions;

    @Data
    public static class McqQuestionData {
        public String title;
        public String optionA;
        public String optionB;
        public String optionC;
        public String optionD;
        public String correctAnswer;
    }

    @Data
    public static class CodingQuestionData {
        public String title;
    }
}
