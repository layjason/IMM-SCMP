package com.example.demo.Exception.Course;

public class CourseException {

    public static class CourseNotFoundException extends RuntimeException {
        public CourseNotFoundException() {
            super("Course not found.");
        }
    }

    public static class UnauthorizedException extends RuntimeException {
        public UnauthorizedException() {
            super("No permission to perform this action.");
        }
    }
}


