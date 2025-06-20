package com.example.demo.Repository.Course;

import com.example.demo.Model.Course.CourseResource;
import com.example.demo.Model.Course.CourseChapter;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseResourceRepository extends JpaRepository<CourseResource, String> {
    List<CourseResource> findByChapter_ChapterId(String chapterId);
}
