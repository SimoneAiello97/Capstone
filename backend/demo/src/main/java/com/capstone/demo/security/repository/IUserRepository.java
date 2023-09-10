package com.capstone.demo.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.demo.security.entity.User;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
