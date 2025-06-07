package com.example.demo.Repository.Class;

import com.example.demo.Model.Class.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClassRepository extends JpaRepository<ClassEntity, String> {
    Optional<ClassEntity> findByClassCode(String classCode);
}
