package com.example.demo.DTO;


import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImportStudentsDTO {
    private List<String> studentIds;
}