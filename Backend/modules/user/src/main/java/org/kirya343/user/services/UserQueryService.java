package org.kirya343.user.services;

import java.util.List;

import org.kirya343.user.services.UserQueryService;
import org.kirya343.security.core.dto.UserAuthData;
import org.kirya343.user.datasource.User;
import org.kirya343.user.datasource.UserRepository;
import org.kirya343.user.dto.UserDTO;
import org.kirya343.security.core.enums.UserStatus;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserQueryService {

    private final UserRepository userRepository;
    
    public List<User> findAll() {
        return userRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public UserDTO getCurrentUser(UserAuthData authData) {
        User user = userRepository.getFullUser(authData.id()).orElseThrow();
        return UserDTO.ofUser(user);
    }

    public List<UserDTO> getRecentUsers(int count) {
        List<User> users = userRepository
            .findAllByStatusOrderByCreatedAtDesc(
                PageRequest.of(0, count), 
                UserStatus.ACTIVE
            )
            .getContent();

        return UserDTO.ofList(users);
    }
}