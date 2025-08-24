
package com.example.demo.Model.User;

import com.example.demo.Model.Course.Course;

import jakarta.persistence.*;
import java.util.*;

import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Teacher extends User {

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Course> taughtCourses;

    public Teacher() {
        super.setRole(Role.TEACHER);
    }
}

