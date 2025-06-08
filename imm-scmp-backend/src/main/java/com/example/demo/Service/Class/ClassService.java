package com.example.demo.Service.Class;

import com.example.demo.Model.Clazz.ClassTask;
import com.example.demo.Repository.Class.TaskRepository;
import com.example.demo.Model.Clazz.ClassEntity;
import com.example.demo.Repository.Class.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import java.util.UUID;

@Service
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private TaskRepository taskRepository;

    public ClassEntity createClass(String className, String teacherId) {
        String classId = UUID.randomUUID().toString();
        String classCode = UUID.randomUUID().toString().substring(0, 6);
        ClassEntity newClass = ClassEntity.builder()
                .classId(classId)
                .className(className)
                .classCode(classCode)
                .teacherId(teacherId)
                .courseIds(new ArrayList<>())
                .studentIds(new ArrayList<>())
                .build();
        return classRepository.save(newClass);
    }

    public ClassEntity updateClass(String classId, String newName) {
        ClassEntity clazz = classRepository.findById(classId).orElseThrow();
        clazz.setClassName(newName);
        return classRepository.save(clazz);
    }

    public void importStudents(String classId, List<String> students) {
        ClassEntity clazz = classRepository.findById(classId).orElseThrow();
        List<String> current = clazz.getStudentIds();
        current.addAll(students);
        classRepository.save(clazz);
    }

    public ClassEntity joinClass(String studentId, String classCode) {
        ClassEntity clazz = classRepository.findByClassCode(classCode).orElseThrow();
        clazz.getStudentIds().add(studentId);
        return classRepository.save(clazz);
    }

    public List<String> getClassMembers(String classId) {
        ClassEntity clazz = classRepository.findById(classId).orElseThrow();
        return clazz.getStudentIds();
    }

    public void deleteStudent(String classId, String studentId) {
        ClassEntity clazz = classRepository.findById(classId).orElseThrow();
        clazz.getStudentIds().remove(studentId);
        classRepository.save(clazz);
    }

}
