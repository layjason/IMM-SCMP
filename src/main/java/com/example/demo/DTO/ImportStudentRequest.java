package com.example.demo.DTO;

import lombok.*;

import java.util.*;

@Data
public class ImportStudentRequest{
    private List<String> studentIds;
}