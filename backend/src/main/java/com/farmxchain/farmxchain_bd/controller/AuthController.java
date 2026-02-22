package com.farmxchain.farmxchain_bd.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.farmxchain.farmxchain_bd.model.User;
import com.farmxchain.farmxchain_bd.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    // Constructor injection
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        authService.register(user);
        return "Registration successful";
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {

        User dbUser = authService.login(user.getEmail(), user.getPassword());

        Map<String, Object> response = new HashMap<>();
        response.put("id", dbUser.getId());
        response.put("username", dbUser.getUsername());
        response.put("role", dbUser.getRole());
        response.put("approved", dbUser.isApproved());

        return response;
    }
}
