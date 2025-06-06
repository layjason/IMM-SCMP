package Model.Course;

import Model.User.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public abstract class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String courseId;

    private String courseName;

    private String courseCode;

    @Column(length = 2000)
    private String syllabus;

    @Column(length = 1000)
    private String objective;

    private String assessmentMethod;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    @CreationTimestamp
    private LocalDateTime createdTime;
}
