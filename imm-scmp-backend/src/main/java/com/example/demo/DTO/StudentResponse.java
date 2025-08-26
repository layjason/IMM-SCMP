package com.example.demo.DTO;

import com.example.demo.Model.User.*;
import lombok.*;

@Data
public class StudentResponse{
    private String userId;
    private String userName;
    private String email;

    public static StudentResponse fromEntity(Student student){
        StudentResponse res = new StudentResponse();
        res.setUserId(student.getUserId());
        res.setUserName(student.getUserName());
        res.setEmail(student.getEmail());

        return res;
    }
}