    package com.example.demo.Service.Class;

    import com.example.demo.Model.Clazz.ClassTask;
    import com.example.demo.Repository.Class.TaskRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;
    import java.util.List;

    @Service
    public class TaskService {

        @Autowired
        private TaskRepository taskRepository;

        public ClassTask assignTask(ClassTask task) {
            if (task.getDeadline() == null) {
                task.setDeadline(LocalDate.now().plusDays(7)); // default 7 say???
            }
            return taskRepository.save(task);
        }

        public List<ClassTask> getTasksByClassId(String classId) {
            return taskRepository.findByClassId(classId);
        }

        public ClassTask updateTaskCompletion(String taskId, boolean completed) {
            ClassTask task = taskRepository.findById(taskId).orElse(null);
            if (task != null) {
                task.setCompleted(completed);
                return taskRepository.save(task);
            }
            return null;
        }
    }
