package com.farmxchain.farmxchain_bd.service;

import com.farmxchain.farmxchain_bd.model.User;
import com.farmxchain.farmxchain_bd.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    // Constructor Injection (Best Practice)
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register User
    public User register(User user) {
        return userRepository.save(user);
    }

    // Login User
    public User login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}
