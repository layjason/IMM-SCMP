package com.example.demo.Repository.Exercise;

import com.example.demo.Model.Exercise.McqQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface McqQuestionRepository extends JpaRepository<McqQuestion, String> {
    Optional<McqQuestion> findTopByOrderByQuestionIdDesc();

    List<McqQuestion> findByAssignment_AssignmentId(String assignmentId);

}
