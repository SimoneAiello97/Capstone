package com.capstone.demo.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.demo.security.entity.User;
import com.capstone.demo.security.event.RegistrationCompleteEvent;
import com.capstone.demo.security.payload.JWTAuthResponse;
import com.capstone.demo.security.payload.LoginDto;
import com.capstone.demo.security.payload.RegisterDto;
import com.capstone.demo.security.service.AuthService;
import com.capstone.demo.security.token.VerificationToken;
import com.capstone.demo.security.token.VerificationTokenRepository;

import jakarta.servlet.http.HttpServletRequest;



@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private ApplicationEventPublisher publisher;
    @Autowired
    private VerificationTokenRepository tokenRepository;
    @Autowired
    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Build Login REST API
    @PostMapping(value = {"/login", "/signin"})
    public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginDto loginDto){
           	
    	String token = authService.login(loginDto);

        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setUsername(loginDto.getUsername());
        jwtAuthResponse.setAccessToken(token);

        return ResponseEntity.ok(jwtAuthResponse);
    }

    // Build Register REST API
    @PostMapping(value = {"/register", "/signup"})
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto, HttpServletRequest request){
        User user = authService.register(registerDto);
         publisher.publishEvent(new RegistrationCompleteEvent(user, applicationUrl(request)));
        return new ResponseEntity<>("User create succssfully! Please, check your email for to complete your registration",
         HttpStatus.CREATED);
    }
    

    public String applicationUrl(HttpServletRequest request) {
        return "http://"+request.getServerName()+":"
                +request.getServerPort()+request.getContextPath();
    }

     @GetMapping("register/verifyEmail")
    public String sendVerificationToken(@RequestParam("token") String token){
        VerificationToken theToken = tokenRepository.findByToken(token);
        if (theToken.getUser().isAuthenticated()){
            return "This account has already been verified, please, login.";
        }
        String verificationResult = authService.validateToken(token);
        if (verificationResult.equalsIgnoreCase("valid")){
            return "Email verified successfully. Now you can login to your account";
        }
        return "Invalid verification link, please, check your email for new verification link";
    }
}
