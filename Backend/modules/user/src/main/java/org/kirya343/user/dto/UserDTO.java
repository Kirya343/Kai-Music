package org.kirya343.user.dto;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collection;
import java.util.List;

import org.kirya343.permission.dto.RoleDTO;
import org.kirya343.user.datasource.User;

public record UserDTO(
    Long id,
    String sub,
    String name,
    String avatarUrl,
    List<RoleDTO> roles,
    String email,
    String status,
    LocalDateTime createdAt
) {

    public static UserDTO ofUser(User user) {

        if (user == null) return null;
         
        return new UserDTO(
            user.getId(), 
            user.getSub(), 
            user.getName(), 
            user.getAvatarUrl(),
            RoleDTO.ofList(user.getRoles()),
            user.getEmail(),
            user.getStatus().toString(),
            LocalDateTime.ofInstant(user.getCreatedAt(), ZoneId.systemDefault())
        );
    }

    public static List<UserDTO> ofList(Collection<User> users) {
        return users.stream().map(u -> UserDTO.ofUser(u)).toList();
    }
}
