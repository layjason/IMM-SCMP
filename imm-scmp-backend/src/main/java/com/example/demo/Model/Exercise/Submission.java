package com.example.demo.Model.Exercise;

import jakarta.persistence.*;

import java.util.Map;

@Entity
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId; // 学生ID

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    // 提交答案，json字符串格式存储，后端转Map处理（题目ID->答案）
    @Lob
    private String answersJson;

    private Double score;

    private Boolean graded;  // 是否已批改

    // 省略getter/setter
}


