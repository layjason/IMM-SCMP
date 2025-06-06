package com.example.demo.Service.Exercise;

import com.example.demo.Model.Exercise.Submission;

public interface SubmissionService {
    Submission submitExercise(Submission submission);
    Submission gradeSubmission(Long submissionId, String manualGradeJson); // 手动批改传入评分数据
}