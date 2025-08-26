package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateClassRequest {
    private String className;
    private String classCode;
    private String teacherId;
    private List<String> courseIds;
    private List<String> studentIds;
}