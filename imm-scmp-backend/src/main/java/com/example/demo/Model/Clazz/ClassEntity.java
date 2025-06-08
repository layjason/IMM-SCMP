package com.example.demo.Model.Clazz;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "classes")
public class ClassEntity {

    @Id
    @Column(name = "class_id")
    private String classId;

    @Column(name = "class_name", nullable = false)
    private String className;

    @Column(name = "class_code", unique = true)
    private String classCode;

    @ElementCollection
    @CollectionTable(name = "class_course_ids", joinColumns = @JoinColumn(name = "class_id"))
    @Column(name = "course_id")
    private List<String> courseIds;

    @ElementCollection
    @CollectionTable(name = "class_student_ids", joinColumns = @JoinColumn(name = "class_id"))
    @Column(name = "student_id")
    private List<String> studentIds;

    @Column(name = "teacher_id", nullable = false)
    private String teacherId;

    @PrePersist
    public void prePersist() {
        if (this.classId == null) {
            this.classId = UUID.randomUUID().toString();
        }
    }
}
