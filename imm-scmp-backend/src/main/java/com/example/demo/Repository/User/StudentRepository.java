package com.example.demo.Repository.User;

import com.example.demo.Model.User.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {

}
