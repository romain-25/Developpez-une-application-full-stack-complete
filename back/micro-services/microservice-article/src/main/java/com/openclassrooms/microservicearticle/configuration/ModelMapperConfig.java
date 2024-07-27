package com.openclassrooms.microservicearticle.configuration;

import com.openclassrooms.microservicearticle.dto.ArticleCreateDto;
import com.openclassrooms.microservicearticle.model.ArticleModel;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean(name = "customModelMapper")
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        modelMapper.typeMap(ArticleCreateDto.class, ArticleModel.class).addMappings(mapper -> {
            mapper.map(ArticleCreateDto::getAuthorID, ArticleModel::setAuthorID);
            mapper.map(ArticleCreateDto::getThemeID, ArticleModel::setThemeID);
        });

        return modelMapper;
    }
}

