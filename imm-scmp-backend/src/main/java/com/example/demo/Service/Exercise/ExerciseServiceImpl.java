package com.example.demo.Service.Exercise;

import com.example.demo.Model.Exercise.Exercise;
import com.example.demo.Model.Exercise.Question;
import com.example.demo.Repository.Exercise.ExerciseRepository;
import com.example.demo.Repository.Exercise.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final QuestionRepository questionRepository;

    public ExerciseServiceImpl(ExerciseRepository exerciseRepository, QuestionRepository questionRepository) {
        this.exerciseRepository = exerciseRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public Exercise createExercise(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    @Override
    public Question addQuestion(Long exerciseId, Question question) {
        Optional<Exercise> exerciseOpt = exerciseRepository.findById(exerciseId);
        if (exerciseOpt.isEmpty()) throw new RuntimeException("Exercise not found");
        question.setExercise(exerciseOpt.get());
        return questionRepository.save(question);
    }

    @Override
    public List<Exercise> getAvailableExercisesForStudent(Long studentId) {
        // 这里简单返回全部练习，实际可加权限和时间过滤
        return exerciseRepository.findAll();
    }

    @Override
    public List<Question> getQuestionsByExercise(Long exerciseId) {
        return questionRepository.findByExerciseId(exerciseId);
    }
}