package com.example.demo.Model.Class;

import jakarta.persistence.*;
import lombok.*;
import com.example.demo.Model.User.*;
import com.example.demo.Model.Course.*;

import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "classes")
public class ClassEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "class_id")
    private String classId;

    @Column(name = "class_name", nullable = false)
    private String className;

    @Column(name = "class_code", unique = true)
    private String classCode;

    @OneToMany(mappedBy = "class")
    private List<Course> courses;

    @OneToMany(mappedBy = "class")
    private List<Student> students;

    @Column(name = "teacher_id", nullable = false)
    private String teacherId;

}
