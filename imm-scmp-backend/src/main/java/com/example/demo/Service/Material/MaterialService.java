package com.example.demo.Service.Material;

import com.example.demo.Model.Material.Material;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MaterialService {
    Material uploadMaterial(String courseId, String userId, MultipartFile file, String title, String description, String type, String chapter, boolean compressed);
    List<Material> getMaterialsByCourse(String courseId);
    List<Material> getMaterialsByChapter(String courseId, String chapter);
    void updateMaterial(String materialId, String title, String description);
    void setMaterialPermission(String materialId, String classId);
    void removeMaterialPermission(String materialId, String classId);
    List<Material> getMaterialVersions(String materialId);
    void setLabel(String materialId, String label);
    void updateLabel(String materialId, String label);
    void removeLabel(String materialId);
    void deleteMaterial(String materialId);

}
