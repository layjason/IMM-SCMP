package com.example.demo.Model.User;

import com.example.demo.Model.Course.Course;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Assistant extends User {
    @OneToOne
    @JoinColumn(name = "assisted_course_id")
    private Course assistedCourse;

    public Assistant() {
        super.setRole(Role.ASSISTANT);
    }
}