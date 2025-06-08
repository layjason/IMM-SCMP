package com.example.demo.Service.Exercise;

import com.example.demo.DTO.*;
import com.example.demo.Model.Exercise.*;
import com.example.demo.Repository.Exercise.*;
import com.example.demo.Repository.User.*;
import com.example.demo.Model.User.*;
import com.example.demo.Util.AuthUtil;
import com.example.demo.Exception.Course.CourseException.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepo;

    @Autowired
    private McqQuestionRepository mcqRepo;

    @Autowired
    private CodingQuestionRepository codingRepo;

    @Autowired
    private StudentAnswerRepository answerRepo;

    @Autowired
    private UserRepository userRepo;

    private User getCurrentUser() {
        String email = AuthUtil.getCurrentUserEmail();
        if (email == null) {
            //throw new UnauthorizedException();
            if (email == null) {
                // Return guest Teacher for testing - remove for production
                Teacher guest = new Teacher();
                guest.setUserId("guest");
                guest.setEmail("guest@example.com");
                guest.setUserName("Guest Teacher");
                guest.setPassword("123456781");
                guest.setRole(User.Role.TEACHER);

                userRepo.save(guest);

                return guest;
            }
        }
        return userRepo.findByEmail(email)
                .orElseThrow(RuntimeException::new);
    }

    public Assignment createAssignmentWithQuestions(CreateAssignmentWithQuestionsRequest request) {
        User user = getCurrentUser();
        String teacherId = user.getUserId();

        Assignment assignment = new Assignment();
        assignment.setAssignmentTitle(request.title);
        assignment.setCreatedDate(LocalDate.now());
        assignment.setEndDate(request.endDate);
        assignment.setTeacherId(teacherId);

        Assignment saved = assignmentRepo.save(assignment);
        String assignmentId = saved.getAssignmentId();

        List<Question> allQuestions = new ArrayList<>();

        String lastMcqId = mcqRepo.findTopByOrderByQuestionIdDesc()
                .map(McqQuestion::getQuestionId).orElse("MQ0000");
        int mcqCounter = Integer.parseInt(lastMcqId.substring(2));

        for (CreateAssignmentWithQuestionsRequest.McqQuestionData q : request.mcqQuestions) {
            McqQuestion question = new McqQuestion();
            mcqCounter++;
            question.setQuestionId(String.format("MQ%04d", mcqCounter));
            question.setQuestionTitle(q.title);
            question.setOptionA(q.optionA);
            question.setOptionB(q.optionB);
            question.setOptionC(q.optionC);
            question.setOptionD(q.optionD);
            question.setCorrectAnswer(q.correctAnswer);
            question.setAssignment(assignment);
            allQuestions.add(question);
        }

        // 3. Add Coding questions
        String lastCodeId = codingRepo.findTopByOrderByQuestionIdDesc()
                .map(CodingQuestion::getQuestionId).orElse("CQ0000");
        int codeCounter = Integer.parseInt(lastCodeId.substring(2));

        for (CreateAssignmentWithQuestionsRequest.CodingQuestionData q : request.codingQuestions) {
            CodingQuestion question = new CodingQuestion();
            codeCounter++;
            question.setQuestionId(String.format("CQ%04d", codeCounter));
            question.setQuestionTitle(q.title);
            question.setAssignment(assignment);
            allQuestions.add(question);
        }

        saved.setQuestions(allQuestions);
        return saved;
    }

    public void submitAssignment(SubmitAssignmentRequest request) {
        User user = getCurrentUser();
        String studentId = user.getUserId();

        for (SubmitAssignmentRequest.AnswerData q : request.questions) {
            String questionId = q.getQuestionId();
            String answer = q.getAnswer();

            StudentAnswer studentAnswer = new StudentAnswer();
            studentAnswer.setStudentId(studentId);
            studentAnswer.setAssignmentId(request.getAssignmentId());
            studentAnswer.setQuestionId(questionId);
            studentAnswer.setAnswer(answer);

            // 自动判分（仅限 MCQ）
            if (questionId.startsWith("MQ")) {
                mcqRepo.findById(questionId).ifPresent(mcq -> {
                    boolean isCorrect = mcq.getCorrectAnswer().equalsIgnoreCase(answer);
                    studentAnswer.setCorrect(isCorrect);
                    studentAnswer.setScore(isCorrect ? 1 : 0);
                });
            } else {
                // 编程题暂不评分
                studentAnswer.setCorrect(false);
                studentAnswer.setScore(null);
            }

            answerRepo.save(studentAnswer);
        }
    }

    public StudentAnswerResponse getStudentAnswers(String assignmentId, String studentId) {
        List<StudentAnswer> answers = answerRepo.findByStudentIdAndAssignmentId(studentId, assignmentId);

        List<StudentAnswerResponse.AnswerDetail> answerDetails = answers.stream().map(ans -> {
            StudentAnswerResponse.AnswerDetail detail = new StudentAnswerResponse.AnswerDetail();
            detail.setQuestionId(ans.getQuestionId());
            detail.setAnswer(ans.getAnswer());
            detail.setIsCorrect(ans.isCorrect());
            detail.setScore(ans.getScore());
            return detail;
        }).toList();

        StudentAnswerResponse response = new StudentAnswerResponse();
        response.setAssignmentId(assignmentId);
        response.setStudentId(studentId);
        response.setAnswers(answerDetails);
        return response;
    }

}

