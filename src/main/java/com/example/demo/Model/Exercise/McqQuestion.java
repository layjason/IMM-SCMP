package com.example.demo.Model.Exercise;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@SuppressWarnings("unused")
@Entity
@Table(name = "mcq_questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class McqQuestion extends Question {
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctAnswer;
}