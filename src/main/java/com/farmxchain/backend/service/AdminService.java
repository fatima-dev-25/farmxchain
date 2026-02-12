package com.farmxchain.backend.service;

import com.farmxchain.backend.entity.User;
import com.farmxchain.backend.entity.UserStatus;
import com.farmxchain.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepo;

    public AdminService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public List<User> getPendingFarmers() {
        return userRepo.findAll()
                .stream()
                .filter(u -> u.getRole().name().equals("FARMER")
                        && u.getStatus().equals(UserStatus.PENDING))
                .toList();
    }

    public void approveFarmer(Long userId) {
        User user = userRepo.findById(userId).orElseThrow();
        user.setStatus(UserStatus.VERIFIED);
        userRepo.save(user);
    }
}