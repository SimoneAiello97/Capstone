package com.capstone.demo.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.demo.security.entity.ERole;
import com.capstone.demo.security.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
	Optional<Role> findByRoleName(ERole roleName);

}
