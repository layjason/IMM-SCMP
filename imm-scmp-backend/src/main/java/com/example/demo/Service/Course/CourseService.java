package com.example.demo.Service.Course;

import com.example.demo.DTO.*;
import com.example.demo.Model.Course.*;
import com.example.demo.Model.User.*;
import com.example.demo.Repository.Course.*;
import com.example.demo.Repository.User.*;
import com.example.demo.Exception.Course.CourseException.*;
import com.example.demo.Util.AuthUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService{

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private CourseChapterRepository chapterRepo;

    @Autowired
    private UserRepository userRepo;

    private User getCurrentUser() {
        String email = AuthUtil.getCurrentUserEmail();
        if (email == null) {
            throw new UnauthorizedException();
        }
        return userRepo.findByEmail(email)
                .orElseThrow(RuntimeException::new);
    }

    public Course createCourse(CreateCourseRequest request){
        User creator = getCurrentUser();

        if (!creator.getRole().name().equals("TEACHER")) {
            throw new UnauthorizedException();
        }

        Course course = new Course();
        course.setCourseName(request.getCourseName());
        course.setSyllabus(request.getSyllabus());
        course.setObjective(request.getObjective());
        course.setAssessmentMethod(request.getAssessmentMethod());
        course.setCreator(creator);

        return courseRepo.save(course);
    }

    public Course getCourseById(Integer courseId) {
        return courseRepo.findById(courseId)
                .orElseThrow(CourseNotFoundException::new);
    }

    public void deleteCourse(Integer courseId) {
        User user = getCurrentUser();

        Course course = courseRepo.findById(courseId)
                .orElseThrow(CourseNotFoundException::new);

        if (!course.getCreator().getUserId().equals(user.getUserId()) ||
                !user.getRole().name().equals("TEACHER")) {
            throw new UnauthorizedException();
        }

        courseRepo.delete(course);
    }
}