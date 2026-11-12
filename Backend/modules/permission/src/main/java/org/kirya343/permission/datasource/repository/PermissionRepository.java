package org.kirya343.permission.datasource.repository;

import java.util.List;

import org.kirya343.permission.datasource.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PermissionRepository extends JpaRepository<Permission, String> {

    List<Permission> findAllByIdIn(List<Long> ids);

    @Modifying
    @Transactional
    @Query("""
        update Permission p
        set
            p.id = coalesce(:newId, p.id),
            p.comment = coalesce(:comment, p.comment)
        where p.id = :id
    """)
    void updatePermission(
            @Param("id") String id,
            @Param("newId") String newId,
            @Param("comment") String comment
    );
}
