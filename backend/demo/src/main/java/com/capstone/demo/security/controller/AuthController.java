package com.capstone.demo.security.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "http://localhost:4200")
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
    @PostMapping(value = { "/login", "/signin" })
    public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginDto loginDto) {

        String token = authService.login(loginDto);

        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setUsername(loginDto.getUsername());
        jwtAuthResponse.setAccessToken(token);

        return ResponseEntity.ok(jwtAuthResponse);
    }

    // Build Register REST API
    @PostMapping(value = { "/register", "/signup" })
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterDto registerDto,
            HttpServletRequest request) {
        User user = authService.register(registerDto);
        publisher.publishEvent(new RegistrationCompleteEvent(user, applicationUrl(request)));

        Map<String, String> response = new HashMap<>();
        response.put("message", "User created successfully! Please, check your email to complete your registration");

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Questo metodo genera l'URL di base dell'applicazione utilizzando le
    // informazioni dalla richiesta HTTP.
    // È utile per costruire URL assoluti nell'applicazione.
    public String applicationUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":"
                + request.getServerPort() + request.getContextPath();
    }

    // Questo metodo gestisce la richiesta GET per la verifica dell'email
    // utilizzando un token.
    @GetMapping("register/verifyEmail")
    public String sendVerificationToken(@RequestParam("token") String token) {
        // Recupera il token di verifica dal repository tramite il token fornito come
        // parametro.
        VerificationToken theToken = tokenRepository.findByToken(token);

        // Verifica se l'utente associato al token è già autenticato.
        if (theToken.getUser().isAuthenticated()) {
            return "This account has already been verified, please, login.";
        }

        // Esegue la validazione del token di verifica attraverso il servizio di
        // autenticazione.
        String verificationResult = authService.validateToken(token);

        // Verifica il risultato della validazione e restituisce un messaggio
        // appropriato.
        if (verificationResult.equalsIgnoreCase("valid")) {
            return "Email verified successfully. Now you can login to your account";
        } else {
            return "Invalid verification link, please, check your email for a new verification link";
        }
    }

}
