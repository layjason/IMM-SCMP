package Model.Exercise;

import jakarta.persistence.*;

@Entity
public class Question {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private String correctAnswer;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    // Getters & Setters
}
