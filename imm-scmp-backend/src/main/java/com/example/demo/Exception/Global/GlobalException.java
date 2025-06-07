package com.example.demo.Exception.Global;

import com.example.demo.Exception.User.UserException;
import com.example.demo.Exception.Course.CourseException;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(UserException.EmailAlreadyExistsException.class)
    public ResponseEntity<String> handleEmailExists(UserException.EmailAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(UserException.InvalidCredentialsException.class)
    public ResponseEntity<String> handleInvalidLogin(UserException.InvalidCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(UserException.UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFound(UserException.UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(UserException.InvalidOldPasswordException.class)
    public ResponseEntity<String> handleInvalidOldPassword(UserException.InvalidOldPasswordException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(CourseException.CourseNotFoundException.class)
    public ResponseEntity<String> handleCourseNotFound(CourseException.CourseNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(CourseException.UnauthorizedException.class)
    public ResponseEntity<String> handleUnauthorized(CourseException.UnauthorizedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
    }
}

