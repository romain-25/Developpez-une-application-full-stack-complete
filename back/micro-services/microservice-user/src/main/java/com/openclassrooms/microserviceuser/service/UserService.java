package com.openclassrooms.microserviceuser.service;

import com.openclassrooms.microserviceuser.dto.TokenDto;
import com.openclassrooms.microserviceuser.dto.UserLoginDto;
import com.openclassrooms.microserviceuser.dto.UserRegisterDto;
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
    UserRepository userRepository;
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
        if(foundUser != null) {
            boolean bcheckPassword = checkPassword(userLoginDto, foundUser);
            if(bcheckPassword) {
                Authentication authentication = new UsernamePasswordAuthenticationToken(foundUser.getEmail(), null, new ArrayList<>());
                String token = jwtService.generateToken(authentication);
                TokenDto tokenDto = new TokenDto(token);
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
    public UserModel createAndSaveUser(UserRegisterDto userRegister) {
        UserModel user = modelMapper.map(userRegister, UserModel.class);
        user.setPassword(passwordEncoder.encode(userRegister.getPassword()));
        return userRepository.save(user);
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
            UserModel newUser = createAndSaveUser(userRegister);
            Authentication authentication = new UsernamePasswordAuthenticationToken(newUser.getEmail(), null, new ArrayList<>());
            String token = jwtService.generateToken(authentication);
            TokenDto tokenDto = new TokenDto(token);
            return ResponseEntity.ok(tokenDto);
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Un utilisateur avec cet email existe déjà");
        }
    }
}
