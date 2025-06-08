package com.example.demo.Repository.Class;

import com.example.demo.Model.Clazz.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ClassRepository extends JpaRepository<ClassEntity, String> {

    // Existing methods
    Optional<ClassEntity> findTopByClassIdStartingWithOrderByClassIdDesc(String prefix);
    Optional<ClassEntity> findTopByClassCodeStartingWithOrderByClassCodeDesc(String prefix);

    // New methods
    Optional<ClassEntity> findByClassCode(String classCode);

    @Query("SELECT c FROM ClassEntity c WHERE c.teacherId = :teacherId")
    List<ClassEntity> findByTeacherId(@Param("teacherId") String teacherId);

    @Query("SELECT c FROM ClassEntity c WHERE :studentId MEMBER OF c.studentIds")
    List<ClassEntity> findByStudentIdContaining(@Param("studentId") String studentId);

    boolean existsByClassIdAndTeacherId(String classId, String teacherId);

    boolean existsByClassIdAndStudentIdsContaining(String classId, String studentId);
}