package com.example.demo.Service.Class;

import com.example.demo.Model.Class.StudentProgress;
import com.example.demo.Repository.Class.StudentProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentProgressService {

    @Autowired
    private StudentProgressRepository progressRepository;

    public List<StudentProgress> getProgressByClassId(String classId) {
        return progressRepository.findByClassId(classId);
    }

    public StudentProgress getProgressByStudentAndClass(String studentId, String classId) {
        return progressRepository.findByStudentIdAndClassId(studentId, classId);
    }

    public StudentProgress updateProgress(StudentProgress progress) {
        return progressRepository.save(progress);
    }
}
