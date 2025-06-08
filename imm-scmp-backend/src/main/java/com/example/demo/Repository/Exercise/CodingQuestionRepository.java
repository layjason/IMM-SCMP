package com.example.demo.Repository.Exercise;

import com.example.demo.Model.Exercise.CodingQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface CodingQuestionRepository extends JpaRepository<CodingQuestion, String> {
    Optional<CodingQuestion> findTopByOrderByQuestionIdDesc();
    List<CodingQuestion> findByAssignment_AssignmentId(String assignmentId);
}
