package  com.example.demo.DTO;

import lombok.*;

@Data
public class RemoveStudentRequest{
    private String classId;
    private String studentId;
}