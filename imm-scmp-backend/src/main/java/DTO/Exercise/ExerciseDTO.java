package DTO.Exercise;

import java.time.LocalDateTime;
import java.util.List;

public class ExerciseDTO {
    public String title;
    public String description;
    public LocalDateTime openTime;
    public LocalDateTime closeTime;
    public boolean allowMultipleSubmissions;
    public List<String> questions;
}