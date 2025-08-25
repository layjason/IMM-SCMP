package com.example.demo.Repository.Exercise;

import com.example.demo.Model.Exercise.StudentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface StudentAnswerRepository extends JpaRepository<StudentAnswer, String>{
    List<StudentAnswer> findByStudentIdAndAssignmentId(String studentId, String assignmentId);
}