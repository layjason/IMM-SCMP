package com.example.demo.Model.Exercise;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "assignments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String assignmentId;

    private List<String> mcqQuestionId;

    private List<String> codingQuestionId;

    @CreationTimestamp
    @Column(name = "created_date", updatable = false)
    private LocalDate createdDate;

    @Column(name = "expire_date", nullable = false)
    private LocalDate expireDate;

}
