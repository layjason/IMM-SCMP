package com.example.demo.Controller.Class;

import com.example.demo.Model.Class.StudentProgress;
import com.example.demo.Service.Class.StudentProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/class/progress")
public class StudentProgressController {

    @Autowired
    private StudentProgressService progressService;

    @GetMapping("/class/{classId}")
    public ResponseEntity<List<StudentProgress>> getClassProgress(@PathVariable String classId) {
        return ResponseEntity.ok(progressService.getProgressByClassId(classId));
    }

    @GetMapping("/student")
    public ResponseEntity<StudentProgress> getProgress(
            @RequestParam String studentId,
            @RequestParam String classId) {
        return ResponseEntity.ok(progressService.getProgressByStudentAndClass(studentId, classId));
    }

    @PostMapping("/update")
    public ResponseEntity<StudentProgress> updateProgress(@RequestBody StudentProgress progress) {
        return ResponseEntity.ok(progressService.updateProgress(progress));
    }
}
