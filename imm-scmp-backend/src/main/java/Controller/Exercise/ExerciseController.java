package Controller.Exercis;

import DTO.Exercise.ExerciseDTO;
import Service.Exercise.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercise")
public class ExerciseController {
    @Autowired
    private ExerciseService exerciseService;

    @PostMapping("/create")
    public String createExercise(@RequestBody ExerciseDTO dto) {
        exerciseService.createExercise(dto);
        return "Exercise created.";
    }

    @PostMapping("/{id}/add-question")
    public String addQuestion(@PathVariable Long id, @RequestBody List<String> questions) {
        exerciseService.addQuestions(id, questions);
        return "Questions added.";
    }
}