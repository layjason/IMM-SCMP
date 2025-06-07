package com.example.demo.Service.Exercise;


import com.example.demo.DAO.QuestionDao;
import com.example.demo.Model.Exercise.Question;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    QuestionDao questionDao;

    public List<Question> getAllQuestions(){

        return questionDao.findAll();

    }

    public List<Question> getQuestionsByCategory(String category){
        return questionDao.findByJiaoshi(category);
    }

    public String addQuestion(Question question){
        questionDao.save(question);
        return "Question added successfully";
    }

    public boolean deleteQuestionById(int id) {
        if (questionDao.existsById(id)) {
            questionDao.deleteById(id);
            return true;
        }
        return false;
    }



}