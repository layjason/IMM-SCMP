package Model.User;

import jakarta.persistence.*;
import lombok.*;
import Model.Course.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Assistant extends User {
    @OneToOne
    @JoinColumn(name = "assisted_course_id")
    private Course assistedCourse;

    public Assistant() {
        super.setRole(Role.ASSISTANT);
    }
}