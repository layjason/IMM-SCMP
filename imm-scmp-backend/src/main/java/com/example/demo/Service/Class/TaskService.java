package com.example.demo.Service.Class;

import com.example.demo.Model.Class.Task;
import com.example.demo.Repository.Class.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task assignTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getTasksByClassId(String classId) {
        return taskRepository.findByClassId(classId);
    }

    public Task updateTaskCompletion(String taskId, boolean completed) {
        Task task = taskRepository.findById(taskId).orElse(null);
        if (task != null) {
            task.setCompleted(completed);
            return taskRepository.save(task);
        }
        return null;
    }
}
