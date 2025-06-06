package com.example.demo.Repository.CourseResource;

import com.example.demo.Model.Course.CourseResource;
import com.example.demo.Model.Course.CourseChapter;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseResourceRepository extends JpaRepository<CourseResource, Long> {
    List<CourseResource> findByChapter(CourseChapter chapter);
}
