package Service.User;

import Model.User.User;
import Repository.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.*;
import DTO.*;
import Exception.User.UserExceptions.*;


import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder; // e.g. BCryptPasswordEncoder bean

    public User registerUser(RegisterRequest registerRequest) {
        if (userRepo.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException();
        }
        User user = new User();
        user.setUserName(registerRequest.getUserName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(User.Role.STUDENT);  // Or set default role as needed
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

}

