package Service.Exercise;

import DTO.Exercise.ExerciseDTO;
import Model.Exercise.Exercise;
import Model.Exercise.Question;
import Repository.Exercise.ExerciseRepository;
import Repository.Exercise.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ExerciseService {
    @Autowired
    private ExerciseRepository exerciseRepo;
    @Autowired
    private QuestionRepository questionRepo;

    public void createExercise(ExerciseDTO dto) {
        Exercise ex = new Exercise();
        ex.setTitle(dto.title);
        ex.setDescription(dto.description);
        ex.setOpenTime(dto.openTime);
        ex.setCloseTime(dto.closeTime);
        ex.setAllowMultipleSubmissions(dto.allowMultipleSubmissions);
        exerciseRepo.save(ex);
    }

    public void addQuestions(Long id, List<String> questions) {
        Exercise ex = exerciseRepo.findById(id).orElseThrow();
        for (String q : questions) {
            Question question = new Question();
            question.setContent(q);
            question.setExercise(ex);
            questionRepo.save(question);
        }
    }
}