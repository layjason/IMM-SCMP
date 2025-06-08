package com.example.demo.Model.Exercise;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "coding_questions")
@Getter
@Setter
@NoArgsConstructor
public class CodingQuestion extends Question {
}
