package Controller.Exercise;

import DTO.Exercise.SubmissionDTO;
import Service.Exercise.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

@RestController
@RequestMapping("/api/submission")
public class SubmissionController {
    @Autowired
    private SubmissionService submissionService;

    @PostMapping("/submit")
    public String submit(@RequestBody SubmissionDTO dto) {
        submissionService.submit(dto);
        return "Submitted.";
    }

    @GetMapping("/{exerciseId}/feedback/{studentId}")
    public String feedback(@PathVariable Long exerciseId, @PathVariable Long studentId) {
        return submissionService.getFeedback(exerciseId, studentId);
    }
}