package com.example.demo.Service.Class;

import com.example.demo.DTO.*;
import com.example.demo.Model.Clazz.ClassEntity;
import com.example.demo.Model.Course.Course;
import com.example.demo.Model.User.*;
import com.example.demo.Repository.Class.ClassRepository;
import com.example.demo.Repository.Course.CourseRepository;
import com.example.demo.Repository.User.StudentRepository;
import com.example.demo.Repository.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.*;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;


    public ClassEntity createClass(CreateClassRequest request) {


        ClassEntity clazz = new ClassEntity();
        clazz.setClassCode(request.getClassCode());
        clazz.setClassName(request.getClassName());
        clazz.setTeacherId(request.getTeacherId());

        // Fetch and set courses
        List<Course> courses = courseRepository.findAllById(request.getCourseIds());
        clazz.setCourses(courses);

        // Fetch and set students
        List<Student> students = studentRepository.findAllById(request.getStudentIds());
        clazz.setStudents(students);
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

    public void deleteStudent(RemoveStudentRequest request) {
        ClassEntity clazz = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new RuntimeException("Class not found"));
        clazz.getStudents().remove(request.getStudentId());
        classRepository.save(clazz);
    }
}