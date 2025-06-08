package com.example.demo.Model.Material;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaterialVersion {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String filePath;
    private LocalDateTime versionTime;

    @ManyToOne
    private Material material;
}
