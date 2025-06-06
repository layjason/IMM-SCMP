package Controller.User;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;

import Model.User.User;
import Service.User.*;
import Service.JwtService;
import DTO.*;
import Exception.User.UserException.*;

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
            savedUser.setPassword(null);
            return ResponseEntity.ok(savedUser);
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.loginUser(loginRequest).get();  // assumes login is successful or throws

        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(token);
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


}

