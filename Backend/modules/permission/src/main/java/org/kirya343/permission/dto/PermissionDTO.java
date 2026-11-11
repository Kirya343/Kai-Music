package org.kirya343.permission.dto;

import java.util.Collection;
import java.util.List;

import org.kirya343.permission.datasource.model.Permission;

public record PermissionDTO(
    String id,
    String comment
) { 

    public static PermissionDTO ofPermission(Permission perm) {
        return new PermissionDTO(perm.getId(), perm.getComment());
    }

    public static List<PermissionDTO> ofList(Collection<Permission> perms) {
        return perms.stream().map(p -> PermissionDTO.ofPermission(p)).toList();
    }
}
