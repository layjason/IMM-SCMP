package com.example.demo.Model.Clazz;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ClassTask {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String taskId;

    @Column(nullable = false)
    private String classId;

    @Column(nullable = false)
    private String title;

    private String description;

    private LocalDate deadline;

    private boolean completed;

    //this is comment
}
