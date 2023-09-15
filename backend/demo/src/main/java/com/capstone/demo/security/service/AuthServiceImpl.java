package com.capstone.demo.security.service;

import java.util.Calendar;
import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.capstone.demo.security.entity.ERole;
import com.capstone.demo.security.entity.Role;
import com.capstone.demo.security.entity.User;
import com.capstone.demo.security.exception.MyAPIException;
import com.capstone.demo.security.payload.LoginDto;
import com.capstone.demo.security.payload.RegisterDto;
import com.capstone.demo.security.repository.IUserRepository;
import com.capstone.demo.security.repository.RoleRepository;
import com.capstone.demo.security.security.JwtTokenProvider;
import com.capstone.demo.security.token.VerificationToken;
import com.capstone.demo.security.token.VerificationTokenRepository;




@Service
public class AuthServiceImpl implements AuthService {

    private AuthenticationManager authenticationManager;
    private IUserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private VerificationTokenRepository tokenRepository;


    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           IUserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public String login(LoginDto loginDto) {
        
    	Authentication authentication = authenticationManager.authenticate(
        		new UsernamePasswordAuthenticationToken(
        				loginDto.getUsername(), loginDto.getPassword()
        		)
        ); 
    	
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }

    @Override
    public User register(RegisterDto registerDto) {
        // Controllo se l'utente di default "ADMIN" esiste nel database
       /*  User adminUser = userRepository.findByUsername("admin").get();
        if (adminUser == null) {
        // L'utente "ADMIN" non esiste, quindi lo creo
        adminUser = new User();
        adminUser.setName("Admin Name");
        adminUser.setUsername("admin");
        adminUser.setEmail("admin@example.com");
        adminUser.setAuthenticated(true);
        adminUser.setPassword(passwordEncoder.encode("admin")); // Imposta la password di default
        Role adminRole = roleRepository.findByRoleName(ERole.ROLE_ADMIN).get();
        adminUser.setRoles(Collections.singleton(adminRole)); // Imposta il ruolo "ADMIN"
        userRepository.save(adminUser);
    } */
    Optional<User> adminUserOptional = userRepository.findByUsername("admin");
    if (adminUserOptional.isEmpty()) {
    // L'utente "admin" non esiste, quindi lo creo
    User adminUser = new User();
    adminUser.setName("Admin Name");
    adminUser.setUsername("admin");
    adminUser.setEmail("admin@example.com");
    adminUser.setAuthenticated(true);
    adminUser.setPassword(passwordEncoder.encode("admin")); // Imposta la password di default
    Role adminRole = roleRepository.findByRoleName(ERole.ROLE_ADMIN).get();
    adminUser.setRoles(Collections.singleton(adminRole)); // Imposta il ruolo "ADMIN"
    userRepository.save(adminUser);
}
        // add check for username exists in database
        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Username `"+ registerDto.getUsername() +"` is already exists!.");
        }

        // add check for email exists in database
        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Email `"+ registerDto.getEmail() +"` is already exists!.");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setShoppingCart(null); 
        user.setOrders(null);
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        /* user.setAuthenticated(false); */

        Set<Role> roles = new HashSet<>();
        
        if(registerDto.getRoles() != null) {
	        registerDto.getRoles().forEach(role -> {
	        	Role userRole = roleRepository.findByRoleName(getRole(role)).get();
	        	roles.add(userRole);
	        });
        } else {
        	Role userRole = roleRepository.findByRoleName(ERole.ROLE_USER).get();
        	roles.add(userRole);
        }
        
        user.setRoles(roles);
        System.out.println(user);
        userRepository.save(user);

        /* return "User registered successfully!."; */
        return user;
    }

    
    public ERole getRole(String role) {
    	if(role.equals("ADMIN")) return ERole.ROLE_ADMIN;
    	else if(role.equals("MODERATOR")) return ERole.ROLE_MODERATOR;
    	else return ERole.ROLE_USER;
    }

    @Override
    public void saveUserVerificationToken(User theUser, String token) {
        VerificationToken verificationToken = new VerificationToken(token, theUser);
        tokenRepository.save(verificationToken);
    }

    @Override
    public String validateToken(String theToken) {
        VerificationToken token = tokenRepository.findByToken(theToken);
        if(token == null){
            return "Invalid verification token";
        }
        User user = token.getUser();
        Calendar calendar = Calendar.getInstance();
        if ((token.getExpirationTime().getTime()-calendar.getTime().getTime())<= 0){
            return "Verification link already expired," +
                    " Please, click the link below to receive a new verification link";
        }
        user.setAuthenticated(true);
        userRepository.save(user);
        return "valid";
    }
    
}
