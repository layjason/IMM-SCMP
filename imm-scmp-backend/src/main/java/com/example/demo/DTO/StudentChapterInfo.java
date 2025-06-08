package com.example.demo.DTO;

import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentChapterInfo {
    private String chapterId;
    private String chapterTitle;
    private double progress;
    private boolean completed;
    private LocalDate submissionDate;
}