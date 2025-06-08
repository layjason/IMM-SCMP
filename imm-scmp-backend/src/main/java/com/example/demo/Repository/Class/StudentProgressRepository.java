package com.example.demo.Repository.Class;

import com.example.demo.Model.Clazz.StudentProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudentProgressRepository extends JpaRepository<StudentProgress, Long> {
    List<StudentProgress> findByClassId(String classId);
    List<StudentProgress> findByStudentId(String studentId);
    StudentProgress findByStudentIdAndClassId(String studentId, String classId);
}
