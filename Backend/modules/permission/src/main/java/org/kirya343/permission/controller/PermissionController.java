package org.kirya343.permission.controller;

import java.util.List;

import org.kirya343.permission.services.PermissionCommandSevice;
import org.kirya343.permission.services.PermissionQueryService;
import org.kirya343.security.core.annotations.controllers.RequiredPermission;
import org.kirya343.permission.datasource.repository.PermissionRepository;
import org.kirya343.permission.datasource.repository.RoleRepository;
import org.kirya343.permission.dto.PermissionDTO;
import org.kirya343.permission.dto.RoleDTO;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/permissions")
public class PermissionController {

    private final PermissionQueryService permissionQueryService;
    private final PermissionCommandSevice permissionCommandSevice;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    @GetMapping
    @RequiredPermission("GET_ALL_PERMISSIONS")
    public List<PermissionDTO> getPermissions() {
        return permissionQueryService.getAllPermissionDtos();
    }

    @GetMapping("/roles")
    @RequiredPermission("GET_ALL_ROLES")
    public List<RoleDTO> getRoles() {
        return permissionQueryService.getAllRoleDtos();
    }

    @GetMapping("/{roleId}/get")
    @RequiredPermission("GET_PERMISSIONS_BY_ROLE")
    public List<PermissionDTO> getPermissionsByRole(@NonNull @PathVariable Long roleId) {
        return permissionQueryService.getPermissionDtosByRole(roleId);
    }

    @PutMapping("/{roleId}/save")
    @RequiredPermission("MANAGE_PERMISSIONS")
    public void savePermissionsForRole(
        @PathVariable Long roleId,
        @RequestParam Long permissionId,
        @RequestParam boolean enabled
    ) {
        permissionCommandSevice.updateRolePermission(roleId, permissionId, enabled);
    }

    @PostMapping("/create/role")
    @RequiredPermission("CREATE_ROLE")
    public String createRole(@RequestParam String roleName) {
        return permissionCommandSevice.createRole(roleName).getId();
    }

    @PostMapping("/create/permission")
    @RequiredPermission("CREATE_PERMISSION")
    public String createPermission(@RequestParam String permissionName) {
        return permissionCommandSevice.createPermisson(permissionName).getId();
    }

    @PatchMapping("/update/permission/{permissionId}")
    @RequiredPermission("UPDATE_PERMISSION")
    public void updatePermission(
        @PathVariable Long permissionId,
        @RequestParam(required = false) String name, 
        @RequestParam(required = false) String comment
    ) {
        permissionRepository.updatePermission(permissionId, name, comment);
    }

    @PostMapping("/user/role")
    @RequiredPermission("ADD_USER_ROLE")
    public void userAddRole(@RequestParam Long userId, @RequestParam Long roleId) {
        roleRepository.addRoleToUser(userId, roleId);
    }

    @DeleteMapping("/user/role")
    @RequiredPermission("REMOVE_USER_ROLE")
    public void userRemoveRole(@RequestParam Long userId, @RequestParam Long roleId) {
        roleRepository.removeRoleFromUser(userId, roleId);
    }
}