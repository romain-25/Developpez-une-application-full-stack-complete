package com.openclassrooms.microserviceuser.controller;

import com.openclassrooms.microserviceuser.dto.UserLoginDto;
import com.openclassrooms.microserviceuser.dto.UserRegisterDto;
import com.openclassrooms.microserviceuser.model.UserModel;
import com.openclassrooms.microserviceuser.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto userLogin) {
       return userService.checkLogin(userLogin);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegisterDto userRegister) {
        return userService.registerUser(userRegister);
    }

    @GetMapping("/auth/profil")
    public UserModel profil(){
        return userService.getUserByEmail("romain@test.fr");
    }
}
