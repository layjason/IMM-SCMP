package com.example.demo.Model.Exercise;

import jakarta.persistence.*;
import com.example.demo.Model.Exercise.*;

import lombok.*;

@Entity
@Table(name = "questions")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class Question {

    @Id
    private String questionId;

    private String questionTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

}

