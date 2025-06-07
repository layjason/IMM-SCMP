package com.example.demo.Repository.Course;

import com.example.demo.Model.Course.Course;
import com.example.demo.Model.Course.CourseChapter;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseChapterRepository extends JpaRepository<CourseChapter, Long> {

    List<CourseChapter> findByCourseOrderByOrderIndexAsc(Course course);
}
