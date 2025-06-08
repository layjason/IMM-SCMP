package com.example.demo.Controller.Class;

import com.example.demo.Model.Clazz.ClassTask;
import com.example.demo.Service.Class.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/assign")
    public ClassTask assignTask(@RequestBody ClassTask task) {
        return taskService.assignTask(task);
    }

    @GetMapping("/class/{classId}")
    public List<ClassTask> getTasks(@PathVariable String classId) {
        return taskService.getTasksByClassId(classId);
    }

    @PutMapping("/complete/{taskId}")
    public ClassTask updateTaskCompletion(@PathVariable String taskId, @RequestParam boolean completed) {
        return taskService.updateTaskCompletion(taskId, completed);
    }
}
