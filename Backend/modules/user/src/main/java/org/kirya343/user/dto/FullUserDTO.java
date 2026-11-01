package org.kirya343.user.dto;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.kirya343.user.datasource.User;
import org.kirya343.security.core.enums.UserStatus;
import org.kirya343.permission.dto.RoleDTO;

public record FullUserDTO(
    String openId,
    String name,
    String avatarUrl,
    UserStatus status,

    List<RoleDTO> roles,
    LocalDateTime createdAt
) {
    public static FullUserDTO ofUser(User user) {

        if (user == null) return null;

        return new FullUserDTO(
            user.getOpenId(),
            user.getName(),
            user.getAvatarUrl(),
            user.getStatus(),
            RoleDTO.ofList(user.getRoles()),
            LocalDateTime.ofInstant(user.getCreatedAt(), ZoneId.systemDefault())
        );
    }
}