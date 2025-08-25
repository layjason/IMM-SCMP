package com.example.demo.Model.Exercise;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentAnswer{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String answerId;

    private String studentId;

    private String assignmentId;

    private String questionId;

    @Lob
    private String answer;

    private boolean isCorrect;

    private Integer score;
}