package com.example.demo.Model.Course;

import com.example.demo.Model.User.*;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.*;

import lombok.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "courses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String courseId;

    private String courseName;

    @Column(unique = true, nullable = false)
    private String courseCode;

    @Column(length = 2000)
    private String syllabus;

    @Column(length = 1000)
    private String objective;

    @Enumerated(EnumType.STRING)
    private AssessmentMethod assessmentMethod;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @CreationTimestamp
    private LocalDateTime createdTime;

    @ElementCollection
    @CollectionTable(name = "course_chapters_id", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "chapter_id")
    private List<String> chapterId;

    public enum AssessmentMethod {
        EXAM,
        PROJECT
    }
}
