package Exception.User;

public class UserException {

    public static class EmailAlreadyExistsException extends RuntimeException {
        public EmailAlreadyExistsException() {
            super("This email is already registered. Please use a different one.");
        }
    }

    public static class InvalidCredentialsException extends RuntimeException {
        public InvalidCredentialsException() {
            super("Invalid username or password. Please try again.");
        }
    }

    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException() {
            super("User not found.");
        }
    }

    public static class InvalidOldPasswordException extends RuntimeException {
        public InvalidOldPasswordException() {
            super("Old password is incorrect. Please try again.");
        }
    }
}
