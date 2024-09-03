package com.openclassrooms.microservicearticle.dto;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Data
@Table(name = "theme")
public class ThemeDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}
