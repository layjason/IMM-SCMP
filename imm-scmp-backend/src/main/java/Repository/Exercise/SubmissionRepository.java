package Repository.Exercise;

import Model.Exercise.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    Optional<Submission> findByExerciseIdAndStudentId(Long exerciseId, Long studentId);
}
