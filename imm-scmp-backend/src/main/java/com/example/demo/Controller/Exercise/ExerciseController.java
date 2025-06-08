package com.example.demo.Controller.Exercise;

import com.example.demo.DTO.*;
import com.example.demo.Model.Exercise.Assignment;
import com.example.demo.Service.Exercise.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assignment")
public class ExerciseController {

    @Autowired
    private AssignmentService assignmentService;

    /**
     * 教师创建 Assignment + 题目
     * POST /api/exercise/assignment
     */
    @PostMapping
    public ResponseEntity<Assignment> createAssignment(@RequestBody CreateAssignmentWithQuestionsRequest request) {
        Assignment assignment = assignmentService.createAssignmentWithQuestions(request);
        return ResponseEntity.ok(assignment);
    }

    /**
     * 学生提交作业答案
     * POST /api/exercise/assignment/submit
     */
    @PostMapping("/submit")
    public ResponseEntity<String> submitAssignment(@RequestBody SubmitAssignmentRequest request) {
        assignmentService.submitAssignment(request);
        return ResponseEntity.ok("Submission successful");
    }

    @GetMapping("/{assignmentId}/answers")
    public ResponseEntity<StudentAnswerResponse> getStudentAnswers(@PathVariable String assignmentId,@RequestParam String studentId){
        StudentAnswerResponse response = assignmentService.getStudentAnswers(assignmentId, studentId);
        return ResponseEntity.ok(response);
    }
}



