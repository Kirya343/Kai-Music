package org.kirya343.permission.dto;

import java.util.Collection;
import java.util.List;

import org.kirya343.permission.datasource.model.Role;

public record RoleDTO(
    String id
) {
    public static RoleDTO ofRole(Role role) {
        return new RoleDTO(role.getId());
    }

    public static List<RoleDTO> ofList(Collection<Role> roles) {
        return roles.stream().map(r -> RoleDTO.ofRole(r)).toList();
    }
}
