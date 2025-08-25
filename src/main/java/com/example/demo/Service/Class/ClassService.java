package com.example.demo.Service.Class;

import com.example.demo.DTO.*;
import com.example.demo.Model.Clazz.ClassEntity;
import com.example.demo.Model.User.*;
import com.example.demo.Repository.Class.ClassRepository;
import com.example.demo.Repository.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.*;

import java.util.*;

@SuppressWarnings("unused")
@Service
@RequiredArgsConstructor
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private UserRepository userRepository;


    public ClassEntity createClass(CreateClassRequest request) {
        String classCode = generateCustomClassCode();

        ClassEntity clazz = new ClassEntity();
        clazz.setClassName(request.getClassName());
        clazz.setTeacherId(request.getTeacherId());
        clazz.setClassCode(classCode);
        return classRepository.save(clazz);
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

    public ClassEntity updateClass(UpdateClassRequest request) {
        ClassEntity clazz = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new RuntimeException("Class not found"));
        clazz.setClassName(request.getNewName());
        return classRepository.save(clazz);
    }

    public ClassEntity joinClass(JoinClassRequest request) {
        ClassEntity clazz = classRepository.findByClassCode(request.getClassCode())
                .orElseThrow(() -> new RuntimeException("Class not found"));

        Student student = (Student) userRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        clazz.getStudents().add(student);
        return classRepository.save(clazz);
    }

    public ClassEntity getClassById(String classId) {
        return classRepository.findById(classId).orElseThrow(() -> new RuntimeException("Class not found"));
    }


    public List<Student> getClassMembers(String classId) {
        ClassEntity clazz = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));
        return clazz.getStudents();
    }

    @SuppressWarnings("unlikely-arg-type")
    public void deleteStudent(RemoveStudentRequest request) {
        ClassEntity clazz = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new RuntimeException("Class not found"));
        clazz.getStudents().remove(request.getStudentId());
        classRepository.save(clazz);
    }
}