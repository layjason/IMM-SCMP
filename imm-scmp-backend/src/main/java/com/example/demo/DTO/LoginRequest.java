    package com.example.demo.DTO;

    import lombok.Getter;
    import lombok.Setter;

    @Getter
    @Setter
    public class LoginRequest {
        private String emailOrId;
        private String password;
    }

