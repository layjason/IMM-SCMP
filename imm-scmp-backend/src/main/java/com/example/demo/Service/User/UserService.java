package com.example.demo.Service.User;

import com.example.demo.Model.User.*;
import com.example.demo.Repository.User.UserRepository;
import com.example.demo.DTO.*;
import com.example.demo.Exception.User.UserException.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(RegisterRequest registerRequest) {
        if (userRepo.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException();
        }

        User user;

        switch (registerRequest.getRole().toUpperCase()) {
            case "TEACHER" -> user = new Teacher();
            case "ASSISTANT" -> user = new Assistant();
            case "STUDENT" -> user = new Student();
            default -> throw new IllegalArgumentException("Invalid role: " + registerRequest.getRole());
        }

        user.setUserName(registerRequest.getUserName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        return userRepo.save(user);
    }


    public Optional<User> loginUser(LoginRequest loginRequest) {
        Optional<User> userOpt = userRepo.findByEmail(loginRequest.getEmail());
        if (userOpt.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), userOpt.get().getPassword())) {
            return userOpt;
        }
        throw new InvalidCredentialsException(); // login failed
    }

    public User updateUserInfo(String userId, UpdateUserRequest updateData) {
        User user = userRepo.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        if (updateData.getEmail() != null && !updateData.getEmail().equals(user.getEmail())) {
            if (userRepo.findByEmail(updateData.getEmail()).isPresent()) {
                throw new EmailAlreadyExistsException();
            }
            user.setEmail(updateData.getEmail());
        }

        if (updateData.getUserName() != null) {
            user.setUserName(updateData.getUserName());
        }

        return userRepo.save(user);
    }

    public void changePassword(String userId, ChangePasswordRequest request) {
        User user = userRepo.findById(userId).orElseThrow(UserNotFoundException::new);
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new InvalidOldPasswordException();
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepo.save(user);
    }

    public String getUserRole(String userId) {
        return userRepo.findById(userId)
                .orElseThrow(UserNotFoundException::new)
                .getRole()
                .name();
    }

    public String getUserIdByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(UserNotFoundException::new)
                .getUserId();
    }


}

