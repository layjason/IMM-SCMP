package com.example.demo.Repository.Class;

import com.example.demo.Model.Clazz.ClassTask;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<ClassTask, String> {
    List<ClassTask> findByClassId(String classId);
}
