package com.example.demo.DTO;


import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClassTaskDTO {
    private String classId;
    private String title;
    private String description;
    private LocalDate deadline;
}