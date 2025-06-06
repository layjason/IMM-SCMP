package com.example.demo.Repository.Exercise;

import com.example.demo.Model.Exercise.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByStudentIdAndExerciseId(Long studentId, Long exerciseId);
}

