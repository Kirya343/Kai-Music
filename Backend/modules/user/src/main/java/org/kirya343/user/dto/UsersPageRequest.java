package org.kirya343.user.dto;

import java.util.List;

public record UsersPageRequest(
    List<UserDTO> users,
    int totalPages
) {
}
