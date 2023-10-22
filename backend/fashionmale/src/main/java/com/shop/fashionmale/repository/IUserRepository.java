package com.shop.fashionmale.repository;

import com.shop.fashionmale.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface IUserRepository extends JpaRepository<User, String> {
    void deleteById(String id);
    @Query("select u from User u where u.username like %:search%")
    List<User> searchUserByUsername(@Param("search") String search);
    Optional<User> findUserByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
