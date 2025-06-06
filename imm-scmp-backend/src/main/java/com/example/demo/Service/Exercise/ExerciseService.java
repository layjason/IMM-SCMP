package com.example.demo.Service.Exercise;

import com.example.demo.Model.Exercise.*;
import com.example.demo.Repository.Exercise.*;

import java.util.List;

public interface ExerciseService {
    Exercise createExercise(Exercise exercise);
    Question addQuestion(Long exerciseId, Question question);
    List<Exercise> getAvailableExercisesForStudent(Long studentId);
    List<Question> getQuestionsByExercise(Long exerciseId);
}

