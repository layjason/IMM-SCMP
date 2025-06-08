package com.example.demo.Service.Material;

import com.example.demo.Model.Material.Material;
import com.example.demo.Repository.Material.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MaterialServiceImpl implements MaterialService {

    private final MaterialRepository materialRepository;

    @Autowired
    public MaterialServiceImpl(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    @Override
    public Material uploadMaterial(String title, MultipartFile file, String chapter, String courseId, String uploaderId) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String storagePath = "uploads/materials/" + fileName;
        File dest = new File(storagePath);
        dest.getParentFile().mkdirs();
        file.transferTo(dest);

        Material material = new Material();
        material.setId(UUID.randomUUID().toString());
        material.setTitle(title);
        material.setFilePath(storagePath);
        material.setCourseId(courseId);
        material.setUploaderId(uploaderId);
        material.setUploadTime(LocalDateTime.now());
        material.setChapter(chapter);

        return materialRepository.save(material);
    }

    @Override
    public List<Material> getMaterialsByCourse(String courseId) {
        return materialRepository.findByCourseId(courseId);
    }

    @Override
    public List<Material> getMaterialsByChapter(String courseId, String chapter) {
        return materialRepository.findByCourseIdAndChapter(courseId, chapter);
    }

    @Override
    public Optional<Material> getMaterialById(String id) {
        return materialRepository.findById(id);
    }

    @Override
    public void deleteMaterial(String materialId) {
        materialRepository.deleteById(materialId);
    }

}