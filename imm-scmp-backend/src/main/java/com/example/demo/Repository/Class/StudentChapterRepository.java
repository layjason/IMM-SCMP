package com.example.demo.Repository.Class;

import com.example.demo.Model.Clazz.StudentChapter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentChapterInfoRepository extends JpaRepository<StudentChapterInfo, String> {
    List<StudentChapterInfo> findByStudentId(String studentId);
}
