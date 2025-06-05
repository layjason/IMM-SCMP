package Model.Exercise;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Submission {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long studentId;
    private LocalDateTime submittedAt;
    private int score;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @Lob
    private String answersJson;

    // Getters & Setters
}
