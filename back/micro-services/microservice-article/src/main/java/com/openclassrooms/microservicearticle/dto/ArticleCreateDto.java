package com.openclassrooms.microservicearticle.dto;

import jakarta.persistence.Entity;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleCreateDto {
    private String title;
    private String content;
    private Long authorID;
    private Long themeID;
}
