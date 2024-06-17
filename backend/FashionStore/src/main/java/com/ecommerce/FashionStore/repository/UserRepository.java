package com.ecommerce.FashionStore.repository;

import com.ecommerce.FashionStore.entity.Product;
import com.ecommerce.FashionStore.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByName(String name);
    Optional<User> findByEmail(String email);
    Boolean existsByName(String name);
    Boolean existsByEmail(String email);
    Page<User> findByNameContaining(String name, Pageable pageable);

    @Query("SELECT u FROM User u WHERE (:searchValue IS NULL OR u.name LIKE %:searchValue%)")
    Page<User> findBySearchValue(
            @Param("searchValue") String searchValue,
            Pageable pageable
    );
    @Query("SELECT DISTINCT u FROM User u JOIN u.roles r WHERE " +
            "(:searchValue IS NULL OR u.name LIKE %:searchValue%) AND " +
            "r.role <> 'ROLE_USER'")
    Page<User> findAdminUsers(
            @Param("searchValue") String searchValue,
            Pageable pageable
    );

    @Query("SELECT DISTINCT u FROM User u LEFT JOIN u.roles r WHERE " +
            "(:searchValue IS NULL OR u.name LIKE %:searchValue%) AND " +
            "(r.role IS NULL OR r.role = 'ROLE_USER')")
    Page<User> findNonAdminUsers(
            @Param("searchValue") String searchValue,
            Pageable pageable
    );

    long countByGender(Boolean gender);

    long countByActive(Boolean active);

}
