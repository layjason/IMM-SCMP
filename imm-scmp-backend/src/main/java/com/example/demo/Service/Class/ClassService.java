package com.example.demo.Service.Class;

import com.example.demo.Model.Clazz.ClassTask;
import com.example.demo.Repository.Class.TaskRepository;
import com.example.demo.Model.Clazz.ClassEntity;
import com.example.demo.Model.User.User;
import com.example.cemo.Repository.Class.StudentChapterRepository;
import com.example.demo.Repository.Class.ClassRepository;
import com.example.demo.Repository.User.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private  StudentChapterRepository;

    @Autowired
    private ChapterRepository chapterRepository;

    public ClassEntity createClass(String className, String teacherId) {
        String classId = UUID.randomUUID().toString();
        String classCode = generateCustomClassCode();

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

    public Optional<List<StudentChapterDTO>> getClassMembersWithChapters(String classId) {
        Optional<ClassEntity> classOpt = classRepository.findById(classId);
        if (classOpt.isEmpty()) return Optional.empty();

        List<String> studentIds = classOpt.get().getStudentIds();
        List<User> students = userRepository.findAllByUserIdIn(studentIds);

        List<StudentChapterDTO> result = new ArrayList<>();

        for (User student : students) {
            List<StudentChapterInfo> chapterInfos = studentChapterInfoRepository.findByStudentId(student.getUserId());

            List<ChapterInfoDTO> chapterDTOs = chapterInfos.stream().map(info -> {
                String chapterTitle = chapterRepository.findById(info.getChapterId())
                        .map(c -> c.getTitle())
                        .orElse("Unknown");

                return new ChapterInfoDTO(
                        info.getChapterId(),
                        chapterTitle,
                        info.getProgress(),
                        info.isCompleted(),
                        info.getSubmissionDate()
                );
            }).toList();

            result.add(new StudentChapterDTO(student.getUserId(), student.getName(), chapterDTOs));
        }

        return Optional.of(result);
    }

    public void deleteStudent(String classId, String studentId) {
        ClassEntity clazz = classRepository.findById(classId).orElseThrow();
        clazz.getStudentIds().remove(studentId);
        classRepository.save(clazz);
    }

}