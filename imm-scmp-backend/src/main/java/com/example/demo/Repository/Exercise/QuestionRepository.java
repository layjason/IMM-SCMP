package com.example.demo.Repository.Exercise;

import com.example.demo.Model.Exercise.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByExerciseId(Long exerciseId);
}

