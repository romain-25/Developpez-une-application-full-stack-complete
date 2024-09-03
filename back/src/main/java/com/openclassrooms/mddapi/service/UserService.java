package com.openclassrooms.microserviceuser.service;

import com.openclassrooms.microserviceuser.dto.*;
import com.openclassrooms.microserviceuser.model.UserModel;
import com.openclassrooms.microserviceuser.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.Date;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    /**
     * Retrieves a user by their email.
     *
     * @param email the email of the user to retrieve
     * @return the user model
     */
    public UserModel getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    /**
     * Retrieves a user by their email.
     *
     * @param email the email of the user to retrieve
     * @return the user model
     */
    public UserProfilDto getUserByEmailForProfil(String email) {
        UserModel user = userRepository.findByEmail(email);
        UserProfilDto userProfil = new UserProfilDto(user.getUsername(), user.getEmail());
        return userProfil;
    }
    /**
     * Checks if the provided password matches the stored password for the user.
     *
     * @param userLoginDto the DTO containing the login details
     * @param user         the user model
     * @return true if the passwords match, false otherwise
     */
    public boolean checkPassword(UserLoginDto userLoginDto, UserModel user) {
        return passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword());
    }

    public ResponseEntity<?> checkLogin(UserLoginDto userLoginDto) {
        UserModel foundUser = userRepository.findByEmail(userLoginDto.getEmail());
        if(foundUser == null) {
            foundUser = userRepository.findByUsername(userLoginDto.getEmail());
        }
        if(foundUser != null) {
            boolean bcheckPassword = checkPassword(userLoginDto, foundUser);
            if(bcheckPassword) {
                Authentication authentication = new UsernamePasswordAuthenticationToken(foundUser.getEmail(), null, new ArrayList<>());
                String token = jwtService.generateToken(authentication);
                TokenDto tokenDto = new TokenDto(token, foundUser.getId(), foundUser.getUsername(), foundUser.getEmail());
                return ResponseEntity.ok(tokenDto);
            }else{
                // Mot de pass incorrect
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect");
            }
        }else {
            // Email incorrect
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect");
        }
    }

    /**
     * Creates a new user.
     *
     * @param userRegister the DTO containing the user details
     * @return the created user model
     */
    public ResponseEntity<?> registerUser(UserRegisterDto userRegister) {
        UserModel foundUser = userRepository.findByEmail(userRegister.getEmail());
        if(foundUser == null) {
            UserModel user = modelMapper.map(userRegister, UserModel.class);
            user.setPassword(passwordEncoder.encode(userRegister.getPassword()));
            UserModel newUser = userRepository.save(user);
            Authentication authentication = new UsernamePasswordAuthenticationToken(newUser.getEmail(), null, new ArrayList<>());
            String token = jwtService.generateToken(authentication);
            TokenDto tokenDto = new TokenDto(token, newUser.getId(), newUser.getUsername(), newUser.getEmail());
            return ResponseEntity.ok(tokenDto);
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Un utilisateur avec cet email existe déjà");
        }
    }

    public MessageDto updateUserProfile(UserProfilDto userUpdate) {
        UserModel user = userRepository.findByEmail(userUpdate.getEmail());

        user.setUsername(userUpdate.getUsername());
        user.setEmail(userUpdate.getEmail());
        userRepository.save(user);

        return new MessageDto("User profile updated successfully");
    }

}
