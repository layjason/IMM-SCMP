package com.example.demo.controller.clazz;

import com.example.demo.DTO.*;
import com.example.demo.Model.Clazz.ClassEntity;
import com.example.demo.Model.User.Student;
import com.example.demo.Service.Class.ClassService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/classes")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;

    @PostMapping
    public ResponseEntity<ClassResponse> createClass(@RequestBody CreateClassRequest request) {
        ClassEntity createdClass = classService.createClass(request);
        return ResponseEntity.status(201).body(ClassResponse.fromEntity(createdClass));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<ClassResponse>> getClassesByUserId(@PathVariable String userId) {
        List<ClassEntity> classes = classService.getClassesByUserId(userId);

        List<ClassResponse> responses = classes.stream()
                .map(ClassResponse::fromEntity)
                .toList();

        return ResponseEntity.ok(responses);
    }


    @PutMapping("/{id}")
    public ResponseEntity<ClassResponse> updateClass(@RequestBody UpdateClassRequest request) {
        ClassEntity updated = classService.updateClass(request);
        return ResponseEntity.ok(ClassResponse.fromEntity(updated));
    }

    @GetMapping("/{classId}/members")
    public ResponseEntity<List<StudentResponse>> getMembers(@PathVariable String classId) {
        List<Student> students = classService.getClassMembers(classId);
        List<StudentResponse> response = students.stream()
                .map(StudentResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{classId}/members/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String classId,
                                              @PathVariable String studentId) {
        RemoveStudentRequest request = new RemoveStudentRequest();
        request.setClassId(classId);
        request.setStudentId(studentId);
        classService.deleteStudent(request);
        return ResponseEntity.noContent().build();
    }
}
