package com.example.demo.Controller.Class;

import com.example.demo.DTO.StudentProgressDTO;
import com.example.demo.Exception.Class.ClassException;
import com.example.demo.Model.Clazz.StudentProgress;
import com.example.demo.Service.Class.StudentProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes/progress")
public class StudentProgressController {

    @Autowired
    private StudentProgressService progressService;

    @GetMapping("/class/{classId}")
    public ResponseEntity<?> getClassProgress(@PathVariable String classId) {
        try {
            List<StudentProgress> progressList = progressService.getProgressByClassId(classId);
            return ResponseEntity.ok(progressList);
        } catch (ClassException.ClassNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to get class progress");
        }
    }

    @GetMapping
    public ResponseEntity<?> getProgress(
            @RequestParam String studentId,
            @RequestParam String classId) {
        try {
            StudentProgress progress = progressService.getProgressByStudentAndClass(studentId, classId);
            return ResponseEntity.ok(progress);
        } catch (ClassException.ProgressNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to get student progress");
        }
    }

    @PostMapping
    public ResponseEntity<?> updateProgress(@RequestBody StudentProgressDTO progressDTO) {
        try {
            StudentProgress updatedProgress = progressService.updateProgress(progressDTO);
            return ResponseEntity.ok(updatedProgress);
        } catch (ClassException.ProgressNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update progress");
        }
    }
}
