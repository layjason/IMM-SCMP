package com.example.demo.Service.Class;

import com.example.demo.DTO.StudentProgressDTO;
import com.example.demo.Model.Clazz.StudentProgress;
import com.example.demo.Repository.Class.StudentProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public StudentProgress updateProgress(StudentProgressDTO progressDTO) {
        StudentProgress progress = progressRepository.findByStudentIdAndClassId(
                progressDTO.getStudentId(),
                progressDTO.getClassId());

        if (progress == null) {
            progress = new StudentProgress();
            progress.setStudentId(progressDTO.getStudentId());
            progress.setClassId(progressDTO.getClassId());
        }

        progress.setCourseCompletionRate(progressDTO.getCourseCompletionRate());
        progress.setAssignmentSubmitted(progressDTO.isAssignmentSubmitted());
        progress.setLastActiveDate(progressDTO.getLastActiveDate());

        return progressRepository.save(progress);
    }
}