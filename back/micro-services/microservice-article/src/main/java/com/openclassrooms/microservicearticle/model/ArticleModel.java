package com.openclassrooms.microservicearticle.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@Entity
@Table(name = "article")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String title;
    @Column
    private String content;
    @Column(name= "Published_Date")
    private Date publishedDate;
    @Column(name= "Author_ID")
    private Long authorID;
    @Column(name= "Theme_ID")
    private Long themeID;
}
