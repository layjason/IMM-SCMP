package com.example.demo.Service.Class;

import com.example.demo.DTO.*;
import com.example.demo.Model.Clazz.ClassEntity;
import com.example.demo.Model.User.User;
import com.example.demo.Repository.Class.ClassRepository;
import com.example.demo.Repository.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.UUID;

@Service
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public ClassEntity createClass(ClassDTO classDTO) {
        String classCode = generateCustomClassCode();

        ClassEntity newClass = ClassEntity.builder()
                .className(classDTO.getClassName())
                .teacherId(classDTO.getTeacherId())
                .courseIds(new ArrayList<>())
                .studentIds(new ArrayList<>())
                .build();
        return classRepository.save(newClass);

    }

    private String generateCustomClassCode() {
        String prefix = "CLASS-";
        Optional<ClassEntity> lastClassOpt = classRepository.findTopByClassCodeStartingWithOrderByClassCodeDesc(prefix);
        int next = 1;
        if (lastClassOpt.isPresent()) {
            String lastCode = lastClassOpt.get().getClassCode();
            try {
                next = Integer.parseInt(lastCode.substring(prefix.length())) + 1;
            } catch (NumberFormatException ignored) {}
        }
        return String.format("%s%05d", prefix, next);
    }

    @Transactional
    public ClassEntity updateClass(String classId, ClassUpdateDTO updateDTO) {
        ClassEntity clazz = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));
        clazz.setClassName(updateDTO.getNewName());
        return classRepository.save(clazz);
    }

    @Transactional
    public void importStudents(String classId, ImportStudentsDTO importDTO) {
        ClassEntity clazz = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));
        List<String> current = clazz.getStudentIds();
        current.addAll(importDTO.getStudentIds());
        classRepository.save(clazz);
    }

    @Transactional
    public ClassEntity joinClass(JoinClassDTO joinDTO) {
        ClassEntity clazz = classRepository.findByClassCode(joinDTO.getClassCode())
                .orElseThrow(() -> new RuntimeException("Class not found"));
        clazz.getStudentIds().add(joinDTO.getStudentId());
        return classRepository.save(clazz);
    }

    public ClassEntity getClassById(String classId) {
        return classRepository.findById(classId).orElseThrow(() -> new RuntimeException("Class not found"));
    }


    public List<User> getClassMembers(String classId) {
        ClassEntity clazz = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));
        List<String> studentIds = clazz.getStudentIds();
        return userRepository.findAllByUserIdIn(studentIds);
    }

    @Transactional
    public void deleteStudent(ClassMemberDTO memberDTO) {
        ClassEntity clazz = classRepository.findById(memberDTO.getClassId())
                .orElseThrow(() -> new RuntimeException("Class not found"));
        clazz.getStudentIds().remove(memberDTO.getStudentId());
        classRepository.save(clazz);
    }
}