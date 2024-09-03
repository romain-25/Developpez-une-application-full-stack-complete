package com.openclassrooms.microservicearticle.model;

import com.openclassrooms.microservicearticle.dto.AuthorDto;
import com.openclassrooms.microservicearticle.dto.ThemeDto;
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
    @ManyToOne
    @JoinColumn(name= "Author_ID", referencedColumnName = "id", insertable = false, updatable = false)
    private AuthorDto author;
    @ManyToOne
    @JoinColumn(name= "Theme_ID", referencedColumnName = "id", insertable = false, updatable = false)
    private ThemeDto theme;
}
