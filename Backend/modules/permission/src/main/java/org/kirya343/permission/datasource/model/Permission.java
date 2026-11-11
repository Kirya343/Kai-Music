package org.kirya343.permission.datasource.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
public class Permission {

    public Permission(String id) {
        this.id = id;
    }

    @Id
    @Setter
    @Column(nullable = false)
    private String id;

    @Setter
    @Column(length = 512)
    private String comment;
}