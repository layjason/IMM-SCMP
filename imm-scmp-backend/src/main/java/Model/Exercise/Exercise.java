package Model.Exercise;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
public class Exercise {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private LocalDateTime openTime;
    private LocalDateTime closeTime;
    private boolean allowMultipleSubmissions;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL)
    private List<Question> questions = new ArrayList<>();

    // Getters & Setters
}