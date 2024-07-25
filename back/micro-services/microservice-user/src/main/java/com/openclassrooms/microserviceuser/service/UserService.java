package com.openclassrooms.microserviceuser.service;

import com.openclassrooms.microserviceuser.model.UserModel;
import com.openclassrooms.microserviceuser.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public UserModel findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
