package org.kirya343.kai.features.user.controller;

import org.kirya343.kai.features.user.services.UserQueryService;
import org.kirya343.kai.infrastructure.security.annotations.controllers.Authenticated;
import org.kirya343.kai.infrastructure.security.annotations.parameters.AuthUser;
import org.kirya343.kai.infrastructure.security.dto.UserAuthData;
import org.kirya343.kai.features.user.dto.UserDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UsersController {

    private final UserQueryService userQueryService;

    @GetMapping("/current")
    @Authenticated //@PreAuthorize("hasAuthority('GET_CURRENT_USER')")
    public UserDTO getCurrentUser(@AuthUser UserAuthData authData) {
        return userQueryService.getCurrentUser(authData);
    }
}