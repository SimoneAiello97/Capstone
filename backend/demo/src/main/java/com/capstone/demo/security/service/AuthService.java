package com.capstone.demo.security.service;

import com.capstone.demo.security.entity.User;
import com.capstone.demo.security.payload.LoginDto;
import com.capstone.demo.security.payload.RegisterDto;

public interface AuthService {
    
	String login(LoginDto loginDto);
    User register(RegisterDto registerDto);

    void saveUserVerificationToken(User theUser, String verificationToken);

    String validateToken(String theToken);
    
}
