package com.openclassrooms.microserviceuser.controller;

import com.openclassrooms.microserviceuser.dto.UserLoginDto;
import com.openclassrooms.microserviceuser.model.UserModel;
import com.openclassrooms.microserviceuser.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @PostMapping("/auth/login")
    public UserLoginDto login(@RequestBody UserLoginDto user) {
//       UserModel foundAccount =
    }

    @GetMapping("/profil")
    public UserModel profil(){
        return userService.findByEmail("romain@test.fr");
    }
}
