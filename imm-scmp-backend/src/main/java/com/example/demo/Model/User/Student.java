package com.example.demo.Model.User;

import com.example.demo.Model.Clazz.*;
import jakarta.persistence.*;

import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Student extends User {
    private Integer joinYear;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private ClassEntity clazz;

    public Student() {
        super.setRole(Role.STUDENT);
    }
}
