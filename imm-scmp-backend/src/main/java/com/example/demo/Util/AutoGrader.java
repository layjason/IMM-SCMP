package com.example.demo.util;

import com.example.demo.Model.Exercise.Question;
import com.example.demo.Model.enums.QuestionType;

import java.util.List;
import java.util.Map;

public class AutoGrader {

    /**
     * 简单自动判分规则：
     * 选择题：答对得满分，错0分
     * 填空题：自动批改暂不支持，返回0分，需教师手动批改
     */
    public static double grade(List<Question> questions, Map<Long, String> studentAnswers) {
        double totalScore = 0;
        double perQuestionScore = 100.0 / questions.size();

        for (Question q : questions) {
            String studentAnswer = studentAnswers.get(q.getId());
            if (q.getType() == QuestionType.MULTIPLE_CHOICE) {
                if (q.getCorrectAnswer().equalsIgnoreCase(studentAnswer)) {
                    totalScore += perQuestionScore;
                }
            } else if (q.getType() == QuestionType.FILL_IN_BLANK) {
                // 填空题自动批改暂不支持
            }
        }
        return totalScore;
    }
}
