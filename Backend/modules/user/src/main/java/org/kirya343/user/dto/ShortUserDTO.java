package org.kirya343.user.dto;

import java.util.Collection;
import java.util.List;

import org.kirya343.user.datasource.User;

public record ShortUserDTO(
    String sub,
    String name,
    String avatarUrl
) {

    public static ShortUserDTO ofUser(User user) {
        return new ShortUserDTO(user.getSub(), user.getName(), user.getAvatarUrl());
    }

    public static List<ShortUserDTO> ofList(Collection<User> users) {
        return users.stream().map(u -> ShortUserDTO.ofUser(u)).toList();
    }
}
