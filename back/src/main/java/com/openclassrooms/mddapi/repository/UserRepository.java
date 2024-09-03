package com.openclassrooms.microserviceuser.repository;

import com.openclassrooms.microserviceuser.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
    public UserModel findByEmail(String email);
    public UserModel findByUsername(String username);
}
