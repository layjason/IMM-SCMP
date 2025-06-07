package com.example.demo.Model.Course;

import jakarta.persistence.*;

import java.util.List;

import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseChapter {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String chapterId;

    private String title;

    private Integer orderIndex;

    @Column(length = 5000)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @ElementCollection
    @CollectionTable(name = "course_chapter_resource_ids", joinColumns = @JoinColumn(name = "chapter_id"))
    @Column(name = "resource_id")
    private List<String> resourceIds;

    private String assignmentId;
}
