package org.kirya343.user.datasource;

import org.kirya343.security.core.enums.UserStatus;
import org.kirya343.permission.datasource.model.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByName(String name);
    Optional<User> findByEmail(String email);
    Optional<User> findBySub(String sub);
    Optional<User> findByApiKey(String apiKey);

    Page<User> findAllByOrderByCreatedAtDesc(Pageable pageable);

    List<User> findByRolesContaining(Role role);
    List<User> findByRoles_Id(String roleId);
    List<User> findByRoles_IdIn(List<String> roleIds);

    List<User> findByStatus(UserStatus status);

    boolean existsByEmail(String email);
    boolean existsByName(String name);
    boolean existsByIdAndRoles_Id(Long userId, String roleId);

    Page<User> findAllByStatusOrderByCreatedAtDesc(Pageable pageable, UserStatus type);

    int countByStatus(UserStatus status);

    @Modifying
    @Transactional
    @Query("update User u set u.name = :name where u.id = :id")
    void updateName(@Param("id") Long id, @Param("name") String name);
    
    @Query("""
        select distinct u
        from User u
        left join fetch u.roles r
        left join fetch r.permissions
        where u.id = :id
    """)
    Optional<User> getFullUser(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("update User u set u.status = :status where u.id = :id")
    void updateStatus(@Param("id") Long id, @Param("status") UserStatus status);
}
