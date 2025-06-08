package com.example.demo.Exception.Class;

public class ClassException {
    public static class ClassNotFoundException extends RuntimeException {
        public ClassNotFoundException() {
            super("Class Not Found");
        }
    }

    public static class InvalidClassCodeException extends RuntimeException {
        public InvalidClassCodeException() {
            super("Invalid class code");
        }
    }

    public static class StudentNotFoundException extends RuntimeException {
        public StudentNotFoundException() {
            super("Student Not Found");
        }
    }

    public static class ProgressNotFoundException extends RuntimeException {
        public ProgressNotFoundException() {
            super("Progress Not Found");
        }
    }

    public static class TaskNotFoundException extends RuntimeException {
        public TaskNotFoundException() {
            super("Task Not Found");
        }
    }
}