package com.openclassrooms.microserviceuser.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserProfilDto {
    private String username;
    private String email;
}
