package Model.User;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userId;

    private String userName;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @CreationTimestamp
    private LocalDateTime createdTime;

    public enum Role {
        STUDENT, TEACHER, ASSISTANT
    }
}