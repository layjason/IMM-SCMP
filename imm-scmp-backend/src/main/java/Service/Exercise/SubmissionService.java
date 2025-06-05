package Service.Exercise;

import DTO.Exercise.SubmissionDTO;
import Model.Exercise.Exercise;
import Model.Exercise.Submission;
import Repository.Exercise.ExerciseRepository;
import Repository.Exercise.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SubmissionService {
    @Autowired
    private SubmissionRepository submissionRepo;
    @Autowired
    private ExerciseRepository exerciseRepo;

    public void submit(SubmissionDTO dto) {
        Exercise ex = exerciseRepo.findById(dto.exerciseId).orElseThrow();
        Submission s = new Submission();
        s.setExercise(ex);
        s.setStudentId(dto.studentId);
        s.setAnswersJson(dto.answersJson);
        s.setSubmittedAt(LocalDateTime.now());
        s.setScore(0); // todo: 自动评分
        submissionRepo.save(s);
    }

    public String getFeedback(Long exerciseId, Long studentId) {
        Submission s = submissionRepo.findByExerciseIdAndStudentId(exerciseId, studentId)
                .orElseThrow();
        return "Score: " + s.getScore();
    }
}
