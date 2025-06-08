package com.example.demo.Model.Exercise;

import jakarta.persistence.*;

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

    private String teacherId;

}

