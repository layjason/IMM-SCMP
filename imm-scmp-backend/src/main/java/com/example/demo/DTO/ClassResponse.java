package com.example.demo.DTO;

import com.example.demo.Model.Clazz.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClassResponse {
    private String classId;
    private String className;
    private String classCode;
    private String teacherId;

    public static ClassResponse fromEntity(ClassEntity entity) {
        ClassResponse response = new ClassResponse();
        response.setClassId(entity.getClassId());
        response.setClassName(entity.getClassName());
        response.setClassCode(entity.getClassCode());
        response.setTeacherId(entity.getTeacherId());
        return response;
    }
}

