package com.example.demo.Model.Class;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_progress")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String studentId;

    @Column(nullable = false)
    private String classId;

    private double courseCompletionRate; // 0.0 - 1.0

    private boolean assignmentSubmitted;

    private String lastActiveDate;
}
