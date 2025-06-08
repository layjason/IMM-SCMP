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

import java.util.*;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

@Service
public class CourseService{

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private CourseChapterRepository chapterRepo;

    @Autowired
    private CourseResourceRepository resourceRepo;

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

    public CourseDetailResponse createCourse(CreateCourseRequest request){
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

        List<CourseChapter> chapters = new ArrayList<>();
        if (request.getChapters() != null) {
            int orderIndex = 1;
            for (CreateCourseChapterRequest chapterRequest : request.getChapters()) {
                CourseChapter chapter = new CourseChapter();
                chapter.setTitle(chapterRequest.getChapterTitle());
                chapter.setOrderIndex(orderIndex++);
                chapter.setCourse(course); // Set back reference to course
                chapters.add(chapter);
            }
        }
        course.setChapters(chapters);

        Course savedCourse = courseRepo.save(course);
        return convertToDetailResponse(savedCourse);
    }

    public Course getCourseById(Integer courseId) {
        return courseRepo.findById(courseId)
                .orElseThrow(CourseNotFoundException::new);
    }

    public CourseDetailResponse getCourseDetailById(Integer courseId) {
        Course course = getCourseById(courseId);
        return convertToDetailResponse(course);
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

    public CourseDetailResponse updateCourse(Integer courseId, CreateCourseRequest request) {
        User user = getCurrentUser();

        Course course = courseRepo.findById(courseId)
                .orElseThrow(CourseNotFoundException::new);

        if (!course.getCreator().getUserId().equals(user.getUserId()) ||
                !user.getRole().name().equals("TEACHER")) {
            throw new UnauthorizedException();
        }

        course.setCourseName(request.getCourseName());
        course.setSyllabus(request.getSyllabus());
        course.setObjective(request.getObjective());
        course.setAssessmentMethod(request.getAssessmentMethod());

        Course updatedCourse = courseRepo.save(course);
        return convertToDetailResponse(updatedCourse);
    }

    public List<CourseDetailResponse> getAllCourses() {
        List<Course> courses = courseRepo.findAll();
        return courses.stream()
                .map(this::convertToDetailResponse)
                .collect(Collectors.toList());
    }



    private CourseDetailResponse convertToDetailResponse(Course course) {
        CourseDetailResponse response = new CourseDetailResponse();
        response.setCourseId(course.getCourseId());
        response.setCourseName(course.getCourseName());
        response.setSyllabus(course.getSyllabus());
        response.setObjective(course.getObjective());
        response.setAssessmentMethod(course.getAssessmentMethod());
        response.setCreatorId(course.getCreator().getUserId());
        response.setCreatedTime(course.getCreatedTime());

        List<CourseChapterResponse> chapterResponses = new ArrayList<>();
        if (course.getChapters() != null) {
            for (CourseChapter chapter : course.getChapters()) {
                CourseChapterResponse chapterResp = new CourseChapterResponse();
                chapterResp.setChapterId(chapter.getChapterId());
                chapterResp.setTitle(chapter.getTitle());
                chapterResp.setOrderIndex(chapter.getOrderIndex());

                List<CourseResourceResponse> resourceResponses = new ArrayList<>();
                if (chapter.getResources() != null) {
                    for (CourseResource resource : chapter.getResources()) {
                        CourseResourceResponse resResp = new CourseResourceResponse();
                        resResp.setResourceId(resource.getResourceId());
                        resResp.setFileName(resource.getFileName());
                        resResp.setFilePath(resource.getFilePath());
                        resResp.setResourceType(resource.getResourceType());
                        resResp.setUploaderId(resource.getUploader() != null ? resource.getUploader().getUserId() : null);
                        resourceResponses.add(resResp);
                    }
                }
                chapterResp.setResources(resourceResponses);

                chapterResponses.add(chapterResp);
            }
        }
        response.setChapters(chapterResponses);
        return response;
    }

}