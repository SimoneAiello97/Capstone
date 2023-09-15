package com.capstone.demo.security.runner;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.capstone.demo.security.entity.ERole;
import com.capstone.demo.security.entity.Role;

import com.capstone.demo.security.repository.IUserRepository;
import com.capstone.demo.security.repository.RoleRepository;
import com.capstone.demo.security.service.AuthService;



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
		setRoleDefault(); 
	}
	
	/* private void setRoleDefault() {
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
	} */
	
	private void setRoleDefault() {
		// Verifica se i ruoli esistono già nel database prima di aggiungerli
		Optional<Role> adminOptional = roleRepository.findByRoleName(ERole.ROLE_ADMIN);
		if (!adminOptional.isPresent()) {
			Role admin = new Role();
			admin.setRoleName(ERole.ROLE_ADMIN);
			roleRepository.save(admin);
		}
		
		Optional<Role> userOptional = roleRepository.findByRoleName(ERole.ROLE_USER);
		if (!userOptional.isPresent()) {
			Role user = new Role();
			user.setRoleName(ERole.ROLE_USER);
			roleRepository.save(user);
		}
		
		Optional<Role> moderatorOptional = roleRepository.findByRoleName(ERole.ROLE_MODERATOR);
		if (!moderatorOptional.isPresent()) {
			Role moderator = new Role();
			moderator.setRoleName(ERole.ROLE_MODERATOR);
			roleRepository.save(moderator);
		}
	
		// Aggiungi ruoli alle HashSet come hai fatto prima
		adminRole = new HashSet<Role>();
		adminRole.add(adminOptional.orElse(null));
		adminRole.add(moderatorOptional.orElse(null));
		adminRole.add(userOptional.orElse(null));
		
		moderatorRole = new HashSet<Role>();
		moderatorRole.add(moderatorOptional.orElse(null));
		moderatorRole.add(userOptional.orElse(null));
		
		userRole = new HashSet<Role>();
		userRole.add(userOptional.orElse(null));
	}
	
	
}
