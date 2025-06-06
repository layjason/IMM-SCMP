package com.example.demo.Controller.Exercise;

import com.example.demo.Model.Exercise.*;
import com.example.demo.Service.Exercise.ExerciseService;
import com.example.demo.Service.Exercise.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;
    private final SubmissionService submissionService;

    public ExerciseController(ExerciseService exerciseService, SubmissionService submissionService) {
        this.exerciseService = exerciseService;
        this.submissionService = submissionService;
    }

    // 教师创建练习
    @PostMapping("/")
    public Exercise createExercise(@RequestBody Exercise exercise) {
        return exerciseService.createExercise(exercise);
    }

    // 教师添加题目
    @PostMapping("/{exerciseId}/questions")
    public Question addQuestion(@PathVariable Long exerciseId, @RequestBody Question question) {
        return exerciseService.addQuestion(exerciseId, question);
    }

    // 学生获取可用练习
    @GetMapping("/available")
    public List<Exercise> getAvailableExercises(@RequestParam Long studentId) {
        return exerciseService.getAvailableExercisesForStudent(studentId);
    }

    // 学生获取练习题目
    @GetMapping("/{exerciseId}/questions")
    public List<Question> getQuestions(@PathVariable Long exerciseId) {
        return exerciseService.getQuestionsByExercise(exerciseId);
    }

    // 学生提交作业（自动批改）
    @PostMapping("/{exerciseId}/submit")
    public Submission submitExercise(@PathVariable Long exerciseId, @RequestBody Submission submission) {
        return submissionService.submitExercise(submission);
    }

    // 教师手动批改
    @PostMapping("/grade/{submissionId}")
    public Submission gradeSubmission(@PathVariable Long submissionId, @RequestBody String gradeJson) {
        return submissionService.gradeSubmission(submissionId, gradeJson);
    }
}

