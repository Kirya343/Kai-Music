package org.kirya343.kai.features.user.dto;

import java.util.List;

public record UsersPageRequest(
    List<UserDTO> users,
    int totalPages
) {
}
