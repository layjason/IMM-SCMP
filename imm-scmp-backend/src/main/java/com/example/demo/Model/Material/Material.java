package com.example.demo.Model.Material;

import com.example.demo.Model.Course.Course;
import com.example.demo.Model.Clazz.ClassEntity;
import com.example.demo.Model.User.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;
    private String description;
    private String type; // e.g. "PDF", "Video", "Code"
    private String chapter;
    private String label;

    private String filePath;
    private boolean compressed;

    private LocalDateTime uploadTime;

    @ManyToOne
    private Course course;

    @ManyToOne
    private User uploader;

    @OneToMany(mappedBy = "material", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MaterialVersion> versions;

    @ManyToMany
    private List<ClassEntity> permittedClasses;
}
