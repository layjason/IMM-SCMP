package com.example.demo.Repository.Class;

import com.example.demo.Model.Clazz.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClassRepository extends JpaRepository<ClassEntity, String> {
    Optional<ClassEntity> findTopByClassIdStartingWithOrderByClassIdDesc(String prefix);

    Optional<ClassEntity> findTopByClassCodeStartingWithOrderByClassCodeDesc(String prefix);
}