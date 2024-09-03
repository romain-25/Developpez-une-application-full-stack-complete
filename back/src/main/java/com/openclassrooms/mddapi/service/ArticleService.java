package com.openclassrooms.microservicearticle.service;

import com.openclassrooms.microservicearticle.dto.ArticleCreateDto;
import com.openclassrooms.microservicearticle.model.ArticleModel;
import com.openclassrooms.microservicearticle.repository.ArticleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {
    @Autowired private ArticleRepository articleRepository;
    @Autowired
    @Qualifier("customModelMapper")
    private ModelMapper modelMapper;

   public ResponseEntity<?> saveArticle(ArticleCreateDto articleCreateDto){

        ArticleModel article = modelMapper.map(articleCreateDto, ArticleModel.class);
        article.setPublishedDate(new Date());
        ArticleModel newArticle = articleRepository.save(article);
        if (newArticle != null) {
            return ResponseEntity.ok().body(newArticle);
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("La sauvegarde à échouée");
        }
    }

    public ResponseEntity<?> deleteArticle(Long id){
       Optional<ArticleModel> article = articleRepository.findById(id);
       return ResponseEntity.ok().body("Suppression effectuée");
    }

    public ResponseEntity<?> singleArticle(Long id){
       Optional<ArticleModel> article = articleRepository.findById(id);
       return ResponseEntity.ok().body(article);
    }

    public ResponseEntity<?> listArticles(){
       List<ArticleModel> articles = articleRepository.findAll();
       return ResponseEntity.ok().body(articles);
    }
}
