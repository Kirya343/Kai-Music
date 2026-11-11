package org.kirya343.permission.datasource.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
public class Role {

    public Role(String id) {
        this.id = id;
    }

    public Role(String id, Set<Permission> permissions) {
        this.id = id;
        this.permissions = permissions;
    }

    @Id
    @Setter
    @Column(unique = true)
    private String id;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "role_inheritance",
        joinColumns = @JoinColumn(name = "role_id"),
        inverseJoinColumns = @JoinColumn(name = "parent_role_id")
    )
    private Set<Role> inheritedRoles = new HashSet<>();

    @Setter
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Permission> permissions = new HashSet<>();
}
