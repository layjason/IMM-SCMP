package com.example.demo.Model.Exercise;

import com.example.demo.Model.enums.QuestionType;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    private String content;   // 题干

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    // 选择题选项，以JSON或String存储简化示例
    @ElementCollection
    private List<String> options;

    private String correctAnswer; // 标准答案(选择题存正确选项，填空题存参考答案)

    // 省略getter/setter
    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public QuestionType getType() {
        return type;
    }

    public void setType(QuestionType type) {
        this.type = type;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
}

