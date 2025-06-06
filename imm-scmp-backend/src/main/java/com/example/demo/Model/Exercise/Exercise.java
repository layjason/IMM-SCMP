package com.example.demo.Model.Exercise;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    // 是否允许多次提交
    private boolean allowMultipleSubmissions;

    // 练习开放时间，简单使用String表示示例
    private String openTime;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL)
    private List<Question> questions;

    // 省略getter/setter
}

