package com.example.demo.Repository.Class;

import com.example.demo.Model.Clazz.StudentProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface StudentProgressRepository extends JpaRepository<StudentProgress, Long> {

    // Existing methods
    List<StudentProgress> findByClassId(String classId);
    List<StudentProgress> findByStudentId(String studentId);
    StudentProgress findByStudentIdAndClassId(String studentId, String classId);

    // New methods
    @Query("SELECT sp FROM StudentProgress sp WHERE sp.classId = :classId ORDER BY sp.courseCompletionRate DESC")
    List<StudentProgress> findByClassIdOrderByCompletionRateDesc(@Param("classId") String classId);

    @Transactional
    @Modifying
    @Query("UPDATE StudentProgress sp SET sp.courseCompletionRate = :completionRate WHERE sp.id = :id")
    void updateCompletionRate(@Param("id") Long id, @Param("completionRate") double completionRate);

    @Query("SELECT AVG(sp.courseCompletionRate) FROM StudentProgress sp WHERE sp.classId = :classId")
    Double getAverageCompletionRateByClassId(@Param("classId") String classId);

    boolean existsByStudentIdAndClassId(String studentId, String classId);
}