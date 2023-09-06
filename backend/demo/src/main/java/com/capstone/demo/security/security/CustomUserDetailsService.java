package com.capstone.demo.security.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.capstone.demo.security.entity.User;
import com.capstone.demo.security.exception.MyAPIException;
import com.capstone.demo.security.repository.IUserRepository;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private IUserRepository userRepository;

    public CustomUserDetailsService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
          User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                 .orElseThrow(() ->
                         new UsernameNotFoundException("User not found with username or email: "+ usernameOrEmail));
        if (!user.isAuthenticated()) {
        throw new MyAPIException(HttpStatus.CREATED, "L'utente non è autenticato");
    }
            Set<GrantedAuthority> authorities = user
            .getRoles()
            .stream()
                .map((role) -> new SimpleGrantedAuthority(role.getRoleName().toString())).collect(Collectors.toSet());

                return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                authorities);
    }
}
