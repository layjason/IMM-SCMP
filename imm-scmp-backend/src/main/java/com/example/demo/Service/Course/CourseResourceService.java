package com.example.demo.Service;

import com.example.demo.DTO.CourseResourceResponse;
import com.example.demo.DTO.UploadCourseResourceRequest;
import com.example.demo.Model.Course.CourseChapter;
import com.example.demo.Model.Course.CourseResource;
import com.example.demo.Model.User.User;
import com.example.demo.Repository.Course.CourseChapterRepository;
import com.example.demo.Repository.Course.CourseResourceRepository;
import com.example.demo.Repository.User.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CourseResourceService {

    private final CourseResourceRepository courseResourceRepository;
    private final CourseChapterRepository courseChapterRepository;
    private final UserRepository userRepository;

    private static final String BASE_UPLOAD_DIR = "uploads/resources/";

    public CourseResourceResponse saveFile(MultipartFile file, UploadCourseResourceRequest request) {
        try {
            // 1. Create safe filename and path
            String originalFilename = file.getOriginalFilename();
            String newFilename = UUID.randomUUID() + "_" + originalFilename;
            Path targetPath = Paths.get(BASE_UPLOAD_DIR, newFilename);
            Files.createDirectories(targetPath.getParent());

            // 2. Save file to disk
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            // 3. Fetch entities from DB

            CourseChapter chapter = courseChapterRepository.findById(request.getChapterId())
                    .orElseThrow(() -> new RuntimeException("Chapter not found"));
            User uploader = userRepository.findById(request.getUploaderId())
                    .orElseThrow(() -> new RuntimeException("Uploader not found"));

            // 4. Create and save resource
            CourseResource resource = new CourseResource();
            resource.setFileName(originalFilename);
            resource.setFilePath(targetPath.toString());
            resource.setResourceType(request.getResourceType());
            resource.setChapter(chapter);
            resource.setUploader(uploader);

            CourseResource saved = courseResourceRepository.save(resource);

            // 5. Return response DTO
            return new CourseResourceResponse(
                    saved.getResourceId(),
                    saved.getFileName(),
                    saved.getResourceType(),
                    saved.getFilePath(),
                    saved.getChapter().getChapterId(),
                    saved.getUploader().getUserId()
            );

        } catch (IOException e) {
            throw new RuntimeException("File storage failed: " + e.getMessage(), e);
        }
    }

    public List<CourseResourceResponse> getResourcesByChapter(String chapterId){
        List<CourseResource> resources = courseResourceRepository.findByChapter_ChapterId(chapterId);
        return resources.stream().map(r -> new CourseResourceResponse(
                r.getResourceId(),
                r.getFileName(),
                r.getResourceType(),
                r.getFilePath(),
                r.getChapter().getChapterId(),
                r.getUploader().getUserId()
        )).toList();
    }
}
