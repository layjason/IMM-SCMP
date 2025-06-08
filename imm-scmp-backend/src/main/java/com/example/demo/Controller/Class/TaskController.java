package com.example.demo.Controller.Class;

import com.example.demo.DTO.ClassTaskDTO;
import com.example.demo.Exception.Class.ClassException;
import com.example.demo.Model.Clazz.ClassTask;
import com.example.demo.Service.Class.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<?> assignTask(@RequestBody ClassTaskDTO taskDTO) {
        try {
            ClassTask assignedTask = taskService.assignTask(taskDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(assignedTask);
        } catch (ClassException.ClassNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to assign task");
        }
    }

    @GetMapping("/class/{classId}")
    public ResponseEntity<?> getTasksByClassId(@PathVariable String classId) {
        try {
            List<ClassTask> tasks = taskService.getTasksByClassId(classId);
            return ResponseEntity.ok(tasks);
        } catch (ClassException.ClassNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to get tasks");
        }
    }

    @PutMapping("/{taskId}/complete")
    public ResponseEntity<?> updateTaskCompletion(
            @PathVariable String taskId,
            @RequestParam boolean completed) {
        try {
            ClassTask updatedTask = taskService.updateTaskCompletion(taskId, completed);
            return ResponseEntity.ok(updatedTask);
        } catch (ClassException.TaskNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update task");
        }
    }
}
