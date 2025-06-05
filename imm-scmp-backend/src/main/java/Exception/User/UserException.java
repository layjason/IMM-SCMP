package Exception.User;

public class UserExceptions {

    public static class EmailAlreadyExistsException extends RuntimeException {
        public EmailAlreadyExistsException() {
            super("该邮箱已被注册，请更换邮箱。");
        }
    }

    public static class InvalidCredentialsException extends RuntimeException {
        public InvalidCredentialsException() {
            super("用户名或密码错误，请重试。");
        }
    }

}
