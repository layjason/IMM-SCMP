package com.example.demo.Controller.Course;

import com.example.demo.DTO.*;
import com.example.demo.Service.Course.CourseResourceService;
import com.example.demo.Service.Course.CourseService;
import lombok.RequiredArgsConstructor;

import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@SuppressWarnings("hiding")
@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class CourseResourceController {

    private final CourseResourceService courseResourceService;

    @PostMapping("/upload")
    public ResponseEntity<List<CourseResourceResponse>> uploadResources(
            @RequestParam("files") MultipartFile[] files,
            @ModelAttribute UploadCourseResourceRequest request) {

        List<CourseResourceResponse> responses = Arrays.stream(files)
                .map(file -> courseResourceService.saveFile(file, request))
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping
    public ResponseEntity<List<CourseResourceResponse>> getByChapter(@RequestParam String chapterId) {
        return ResponseEntity.ok(courseResourceService.getResourcesByChapter(chapterId));
    }
}

