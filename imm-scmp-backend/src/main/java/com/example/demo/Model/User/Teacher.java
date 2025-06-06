package Model.User;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;
import Model.Course.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Teacher extends User {
    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Course> taughtCourses;

    public Teacher() {
        super.setRole(Role.TEACHER);
    }
}

