package com.example.demo.Service.Exercise;

import com.example.demo.Model.Exercise.Exercise;
import com.example.demo.Model.Exercise.Question;
import com.example.demo.Model.Exercise.Submission;
import com.example.demo.Repository.Exercise.ExerciseRepository;
import com.example.demo.Repository.Exercise.QuestionRepository;
import com.example.demo.Repository.Exercise.SubmissionRepository;
import com.example.demo.util.AutoGrader;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class SubmissionServiceImpl implements SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final QuestionRepository questionRepository;
    private final ExerciseRepository exerciseRepository;
    private final ObjectMapper mapper = new ObjectMapper();

    public SubmissionServiceImpl(SubmissionRepository submissionRepository,
                                 QuestionRepository questionRepository,
                                 ExerciseRepository exerciseRepository) {
        this.submissionRepository = submissionRepository;
        this.questionRepository = questionRepository;
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public Submission submitExercise(Submission submission) {
        try {
            Map<Long, String> answers = mapper.readValue(submission.getAnswersJson(), new TypeReference<>() {});
            List<Question> questions = questionRepository.findByExerciseId(submission.getExercise().getId());

            double score = AutoGrader.grade(questions, answers);
            submission.setScore(score);
            submission.setGraded(true);

            return submissionRepository.save(submission);
        } catch (Exception e) {
            throw new RuntimeException("自动批改失败", e);
        }
    }

    @Override
    public Submission gradeSubmission(Long submissionId, String manualGradeJson) {
        Submission submission = submissionRepository.findById(submissionId).orElseThrow(() -> new RuntimeException("提交记录不存在"));

        try {
            Map<String, Object> gradeMap = mapper.readValue(manualGradeJson, Map.class);
            Double score = Double.parseDouble(gradeMap.get("score").toString());
            submission.setScore(score);
            submission.setGraded(true);
            return submissionRepository.save(submission);
        } catch (Exception e) {
            throw new RuntimeException("手动批改失败", e);
        }
    }

    public Submission submit(Long studentId, Long exerciseId, Map<Long, String> answers) {
        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow();

        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(exercise.getStartTime()) || now.isAfter(exercise.getEndTime())) {
            throw new RuntimeException("当前时间不允许提交该练习");
        }

        Submission submission = new Submission();
        submission.setExercise(exercise);
        submission.setStudentId(studentId);
        submission.setAnswersJson(convertToJson(answers));
        submission.setGraded(false);
        return submissionRepository.save(submission);
    }

    private String convertToJson(Map<Long, String> answers) {
        try {
            return mapper.writeValueAsString(answers);
        } catch (Exception e) {
            throw new RuntimeException("答案转换失败", e);
        }
    }
}
