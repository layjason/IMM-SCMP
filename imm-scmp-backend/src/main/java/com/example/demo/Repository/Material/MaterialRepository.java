package com.example.demo.Repository.Material;

import com.example.demo.Model.Material.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, String> {
    List<Material> findByCourseId(String courseId);
    List<Material> findByCourseIdAndChapter(String courseId, String chapter);
}
