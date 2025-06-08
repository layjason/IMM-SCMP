package com.example.demo.Controller.Material;

import com.example.demo.Model.Material.Material;
import com.example.demo.Service.Material.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/material")
public class MaterialController {

    @Autowired
    private final MaterialService materialService;

    @Autowired
    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Material> uploadMaterial(@RequestParam String title,
                                                   @RequestParam String description,
                                                   @RequestParam MultipartFile file,
                                                   @RequestParam String chapter,
                                                   @RequestParam String courseId,
                                                   @RequestParam String uploaderId,
                                                   @RequestParam String label,
                                                   @RequestParam boolean compressed) throws IOException {
        Material material = materialService.uploadMaterial(title, description, file, chapter, courseId, uploaderId, label, compressed);
        return ResponseEntity.ok(material);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Material>> getMaterialsByCourse(@PathVariable String courseId) {
        return ResponseEntity.ok(materialService.getMaterialsByCourse(courseId));
    }

    @GetMapping("/course/{courseId}/chapter/{chapter}")
    public ResponseEntity<List<Material>> getMaterialsByChapter(@PathVariable String courseId,
                                                                @PathVariable String chapter) {
        return ResponseEntity.ok(materialService.getMaterialsByChapter(courseId, chapter));
    }

    @DeleteMapping("/{materialId}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable String materialId) {
        materialService.deleteMaterial(materialId);
        return ResponseEntity.noContent().build();
    }
}

