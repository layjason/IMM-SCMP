package com.example.demo.DTO;

import java.util.Date;
import java.time.LocalDateTime;

public class ExerciseDTO {
    public String title;
    public String description;
    public String createdBy;
    public boolean allowMultipleSubmissions;
    public Date openTime;
    public Date closeTime;
    public LocalDateTime startTime;
    public LocalDateTime endTime;

    public String getTitle() {
        return title;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }
}
