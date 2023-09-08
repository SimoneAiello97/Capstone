package com.capstone.demo.security.runner;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.capstone.demo.security.entity.ERole;
import com.capstone.demo.security.entity.Role;
import com.capstone.demo.security.payload.RegisterDto;
import com.capstone.demo.security.repository.IUserRepository;
import com.capstone.demo.security.repository.RoleRepository;
import com.capstone.demo.security.service.AuthService;

import jakarta.annotation.PostConstruct;


@Component
public class AuthRunner implements ApplicationRunner {
	
	@Autowired RoleRepository roleRepository;
	@Autowired IUserRepository userRepository;
	@Autowired PasswordEncoder passwordEncoder;
	@Autowired AuthService authService;
	
	private Set<Role> adminRole;
	private Set<Role> moderatorRole;
	private Set<Role> userRole;

	/* @Value("${app.roles.setup.enabled}")
    private boolean rolesSetupEnabled; */

	//private boolean rolesInitialized = false;

    /* @PostConstruct
    public void init() {
        if (rolesSetupEnabled) {
            setRoleDefault();
        }
    } */
	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("Run auth...");
		// Da lanciare solo la prima volta
		//setRoleDefault(); 
		/* if (rolesSetupEnabled && !rolesInitialized) {
            setRoleDefault();
            rolesInitialized = true; // Imposta il flag di inizializzazione a true
        } */
	}
	
	private void setRoleDefault() {
		Role admin = new Role();
		admin.setRoleName(ERole.ROLE_ADMIN);
		roleRepository.save(admin);
		
		Role user = new Role();
		user.setRoleName(ERole.ROLE_USER);
		roleRepository.save(user);
		
		Role moderator = new Role();
		moderator.setRoleName(ERole.ROLE_MODERATOR);
		roleRepository.save(moderator);
		
		adminRole = new HashSet<Role>();
		adminRole.add(admin);
		adminRole.add(moderator);
		adminRole.add(user);
		
		moderatorRole = new HashSet<Role>();
		moderatorRole.add(moderator);
		moderatorRole.add(user);
		
		userRole = new HashSet<Role>();
		userRole.add(user);
	}

}
