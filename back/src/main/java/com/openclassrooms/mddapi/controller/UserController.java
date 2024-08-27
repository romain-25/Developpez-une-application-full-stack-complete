package com.openclassrooms.microserviceuser.controller;

import com.openclassrooms.microserviceuser.dto.MessageDto;
import com.openclassrooms.microserviceuser.dto.UserProfilDto;
import com.openclassrooms.microserviceuser.dto.UserLoginDto;
import com.openclassrooms.microserviceuser.dto.UserRegisterDto;
import com.openclassrooms.microserviceuser.model.UserModel;
import com.openclassrooms.microserviceuser.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto userLogin) {
       return userService.checkLogin(userLogin);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegisterDto userRegister) {
        return userService.registerUser(userRegister);
    }

    @PostMapping("/profil")
    public UserProfilDto profil(@RequestBody UserProfilDto email){
        return userService.getUserByEmailForProfil(email.getEmail());
    }

    @PutMapping("/profil")
    public MessageDto updateProfile(@Valid @RequestBody UserProfilDto userUpdate) {
        return userService.updateUserProfile(userUpdate);
    }

}
