package com.example.demo.DTO;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentChapter {
    private String studentId;
    private String studentName;
    private List<ChapterInfoDTO> chapters;
}