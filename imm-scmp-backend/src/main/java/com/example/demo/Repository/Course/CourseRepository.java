package com.example.demo.Repository.Course;

import com.example.demo.Model.Course.Course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
    boolean existsById(int id);
}
