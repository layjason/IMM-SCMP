package com.example.demo.Controller.User;


import com.example.demo.Model.User.Student;
import com.example.demo.Service.User.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/unassigned")
    public ResponseEntity<List<Student>> getUnassignedStudents() {
        List<Student> unassignedStudents = studentService.getUnassignedStudents();
        return ResponseEntity.ok(unassignedStudents);
    }
}