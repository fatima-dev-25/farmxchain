package com.farmxchain.farmxchain_bd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.farmxchain.farmxchain_bd.model.User;
import com.farmxchain.farmxchain_bd.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/farmers")
    public List<User> getAllFarmers() {
        return userRepository.findByRole("Farmer");
    }

    @PutMapping("/approve/{id}")
    public String approveFarmer(@PathVariable Long id) {

        User user = userRepository.findById(id).orElseThrow();
        user.setApproved(true);
        userRepository.save(user);

        return "Farmer approved";
    }
}
