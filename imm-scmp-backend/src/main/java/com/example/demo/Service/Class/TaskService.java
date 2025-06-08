package com.example.demo.Service.Class;

import com.example.demo.DTO.ClassTaskDTO;
import com.example.demo.Model.Clazz.ClassTask;
import com.example.demo.Repository.Class.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Transactional
    public ClassTask assignTask(ClassTaskDTO taskDTO) {
        ClassTask task = new ClassTask();
        task.setClassId(taskDTO.getClassId());
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());

        if (taskDTO.getDeadline() == null) {
            task.setDeadline(LocalDate.now().plusDays(7));
        } else {
            task.setDeadline(taskDTO.getDeadline());
        }

        task.setCompleted(false);
        return taskRepository.save(task);
    }

    public List<ClassTask> getTasksByClassId(String classId) {
        return taskRepository.findByClassId(classId);
    }

    @Transactional
    public ClassTask updateTaskCompletion(String taskId, boolean completed) {
        ClassTask task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setCompleted(completed);
        return taskRepository.save(task);
    }
}