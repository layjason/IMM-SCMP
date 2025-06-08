package com.example.demo.Model.Clazz;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentChapterInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String studentId;
    private String chapterId;

    private double progress;
    private boolean completed;
    private LocalDate submissionDate;
}
