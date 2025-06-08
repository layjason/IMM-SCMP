package com.example.demo.Controller;

import com.example.demo.DTO.*;
import com.example.demo.Service.CourseResourceService;

import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class CourseResourceController{
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
    public ResponseEntity<List<CourseResourceResponse>> getByChapter(@RequestParam String chapterId){
        return ResponseEntity.ok(courseResourceService.getResourcesByChapter(chapterId));
    }

}