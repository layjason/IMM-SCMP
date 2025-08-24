package com.example.demo.Controller.User;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;

import com.example.demo.Model.User.*;
import com.example.demo.Service.User.*;
import com.example.demo.Service.JwtService;
import com.example.demo.DTO.*;
import com.example.demo.Exception.User.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            User savedUser = userService.registerUser(registerRequest);
            String token = jwtService.generateToken(savedUser);

            AuthResponse response = new AuthResponse(
                    savedUser.getUserId(),
                    savedUser.getEmail(),
                    savedUser.getRole().name(),
                    token
            );

            return ResponseEntity.ok(response);
        } catch (UserException.EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.loginUser(loginRequest)
                    .orElseThrow(UserException.InvalidCredentialsException::new);

            String token = jwtService.generateToken(user);

            AuthResponse response = new AuthResponse(
                    user.getUserId(),
                    user.getEmail(),
                    user.getRole().name(),
                    token
            );

            return ResponseEntity.ok(response);
        } catch (UserException.InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PutMapping("/{userId}/edit-profile")
    public ResponseEntity<?> editProfile(
            @PathVariable String userId,
            @RequestBody UpdateUserRequest profileData) {
        userService.updateUserInfo(userId, profileData);
        return ResponseEntity.ok("Profile Changed Successfully");
    }

    @PutMapping("/{userId}/change-password")
    public ResponseEntity<?> changePassword(
            @PathVariable String userId,
            @RequestBody ChangePasswordRequest request) {
        userService.changePassword(userId, request);
        return ResponseEntity.ok("Password Changed Successfully");
    }

    @GetMapping("/{userId}/role")
    public ResponseEntity<String> getUserRole(@PathVariable String userId) {
        String role = userService.getUserRole(userId);
        return ResponseEntity.ok(role);
    }

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

}

