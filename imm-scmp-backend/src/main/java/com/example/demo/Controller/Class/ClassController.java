package com.example.demo.Controller.Class;

import com.example.demo.DTO.*;
import com.example.demo.Exception.Class.ClassException;
import com.example.demo.Model.Clazz.ClassEntity;
import com.example.demo.Model.User.User;
import com.example.demo.Service.Class.ClassService;
import com.example.demo.Service.Class.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
public class ClassController {

    @Autowired
    private ClassService classService;

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<?> createClass(@RequestBody ClassDTO classDTO) {
        try {
            ClassEntity createdClass = classService.createClass(classDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdClass);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create class");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClass(@PathVariable String id) {
        try {
            ClassEntity classEntity = classService.getClassById(id);
            return ResponseEntity.ok(classEntity);
        } catch (ClassException.ClassNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to get class");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClass(@PathVariable String id, @RequestBody ClassUpdateDTO updateDTO) {
        try {
            ClassEntity updatedClass = classService.updateClass(id, updateDTO);
            return ResponseEntity.ok(updatedClass);
        } catch (ClassException.ClassNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update class");
        }
    }

    @PostMapping("/{classId}/students/import")
    public ResponseEntity<?> importStudents(@PathVariable String classId, @RequestBody ImportStudentsDTO importDTO) {
        try {
            classService.importStudents(classId, importDTO);
            return ResponseEntity.ok().build();
        } catch (ClassException.ClassNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to import students");
        }
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinClass(@RequestBody JoinClassDTO joinDTO) {
        try {
            ClassEntity joinedClass = classService.joinClass(joinDTO);
            return ResponseEntity.ok(joinedClass);
        } catch (ClassException.ClassNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (ClassException.InvalidClassCodeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to join class");
        }
    }

    @GetMapping("/{classId}/members")
    public ResponseEntity<?> getMembers(@PathVariable String classId) {
        try {
            List<User> members = classService.getClassMembers(classId);
            return ResponseEntity.ok(members);
        } catch (ClassException.ClassNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to get class members");
        }
    }

    @DeleteMapping("/{classId}/members/{studentId}")
    public ResponseEntity<?> deleteStudent(
            @PathVariable String classId,
            @PathVariable String studentId) {
        try {
            ClassMemberDTO memberDTO = new ClassMemberDTO();
            memberDTO.setClassId(classId);
            memberDTO.setStudentId(studentId);
            classService.deleteStudent(memberDTO);
            return ResponseEntity.noContent().build();
        } catch (ClassException.ClassNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (ClassException.StudentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete student from class");
        }
    }
}