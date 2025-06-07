package com.example.demo.Controller.Exercise;


import com.example.demo.Model.Exercise.Question;
import com.example.demo.Service.Exercise.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("question")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @GetMapping("allQuestion")
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        if (questions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(questions);
        }
        return ResponseEntity.ok(questions);
    }

    @GetMapping("jiaoshi/{category}")
    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String category) {
        List<Question> questions = questionService.getQuestionsByCategory(category);
        if (questions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(questions);
        }
        return ResponseEntity.ok(questions);
    }

    @PostMapping("create")
    public ResponseEntity<String> addQuestion(@RequestBody Question question) {
        try {
            String result = questionService.addQuestion(question);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add question: " + e.getMessage());
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable int id) {
        boolean deleted = questionService.deleteQuestionById(id);
        if (deleted) {
            return ResponseEntity.ok("Question deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question not found");
        }
    }

}
