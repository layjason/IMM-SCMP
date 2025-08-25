package com.example.demo.Repository.Class;

import com.example.demo.Model.Clazz.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@SuppressWarnings("unused")
public interface ClassRepository extends JpaRepository<ClassEntity, String> {
    Optional<ClassEntity> findByClassCode(String classCode);

    Optional<ClassEntity> findTopByClassCodeStartingWithOrderByClassCodeDesc(String prefix);
}