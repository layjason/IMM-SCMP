package com.example.demo.Repository.Class;

import com.example.demo.Model.Clazz.ClassTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<ClassTask, String> {

    // Existing method
    List<ClassTask> findByClassId(String classId);

    // New methods
    List<ClassTask> findByClassIdAndCompleted(String classId, boolean completed);

    List<ClassTask> findByClassIdAndDeadlineBeforeAndCompletedFalse(String classId, LocalDate date);

    @Transactional
    @Modifying
    @Query("UPDATE ClassTask ct SET ct.completed = :completed WHERE ct.taskId = :taskId")
    int setTaskCompletedStatus(@Param("taskId") String taskId, @Param("completed") boolean completed);

    @Query("SELECT COUNT(ct) FROM ClassTask ct WHERE ct.classId = :classId AND ct.completed = true")
    long countCompletedTasksByClassId(@Param("classId") String classId);

    @Query("SELECT ct FROM ClassTask ct WHERE ct.classId = :classId AND ct.deadline BETWEEN :start AND :end")
    List<ClassTask> findTasksByClassIdAndDeadlineBetween(
            @Param("classId") String classId,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end);
}