package com.example.demo.Model.Clazz;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Data
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

    @Column(name = "class_code", nullable = false, unique = true)
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
}
