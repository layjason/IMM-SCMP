package com.example.demo.Controller.Class;

import com.example.demo.Model.Clazz.ClassEntity;
import com.example.demo.Model.Clazz.ClassTask;
import com.example.demo.Service.Class.ClassService;
import com.example.demo.Service.Class.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/class")
public class ClassController {

    @Autowired
    private ClassService classService;

    @Autowired
    private TaskService taskService;

    @PostMapping("/create")
    public ClassEntity createClass(@RequestParam String className, @RequestParam String teacherId) {
        return classService.createClass(className, teacherId);
    }

    @PutMapping("/update/{id}")
    public ClassEntity updateClass(@PathVariable String id, @RequestParam String newName) {
        return classService.updateClass(id, newName);
    }

    @PostMapping("/import")
    public void importStudents(@RequestParam String classId, @RequestBody List<String> students) {
        classService.importStudents(classId, students);
    }

    @PostMapping("/join")
    public ClassEntity joinClass(@RequestParam String studentId, @RequestParam String classCode) {
        return classService.joinClass(studentId, classCode);
    }

    @GetMapping("/members/{classId}")
    public List<String> getMembers(@PathVariable String classId) {
        return classService.getClassMembers(classId);
    }

    @DeleteMapping("/member")
    public void deleteStudent(@RequestParam String classId, @RequestParam String studentId) {
        classService.deleteStudent(classId, studentId);
    }

    @PostMapping("/assign")
    public ResponseEntity<ClassTask> assignTask(@RequestBody ClassTask task) {
        return ResponseEntity.ok(taskService.assignTask(task));
    }

}
