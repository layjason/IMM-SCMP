package Model.User;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Student extends User {
    private Integer joinYear;
    private String classId;

    public Student() {
        super.setRole(Role.STUDENT);
    }
}
