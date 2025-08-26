package com.example.demo.Service.User;

import com.example.demo.Model.User.Student;
import com.example.demo.Repository.User.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getUnassignedStudents() {
        return studentRepository.findByClazzIsNull();
    }
}
