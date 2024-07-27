package com.openclassrooms.microservicearticle.controller;

import com.openclassrooms.microservicearticle.dto.ArticleCreateDto;
import com.openclassrooms.microservicearticle.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class ArticleController {
    @Autowired
    ArticleService articleService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ArticleCreateDto articleCreate){
       return articleService.saveArticle(articleCreate);
    }
}
