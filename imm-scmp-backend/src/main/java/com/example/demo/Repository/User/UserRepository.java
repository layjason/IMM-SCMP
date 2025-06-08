package com.example.demo.Repository.User;

import com.example.demo.Model.User.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findTopByUserIdStartingWithOrderByUserIdDesc(String prefix);
}

