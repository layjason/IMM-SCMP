package com.example.demo.DAO;

import com.example.demo.Model.Exercise.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizDao extends JpaRepository<Quiz,Integer> {
}
