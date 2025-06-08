package com.example.demo.Security;

import com.example.demo.Service.JwtService;
import com.example.demo.Repository.User.UserRepository;
import com.example.demo.Model.User.User;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        return "OPTIONS".equalsIgnoreCase(request.getMethod()) ||
                path.startsWith("/api/courses") ||
                path.startsWith("/api/users") ;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        try {
            final String authHeader = request.getHeader("Authorization");

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                sendError(response, "Missing or invalid Authorization header");
                return;
            }

            String jwt = authHeader.substring(7);
            if (!jwtService.isTokenValid(jwt)) {
                sendError(response, "Invalid or expired token");
                return;
            }

            String email = jwtService.extractEmail(jwt);
            if (email == null) {
                sendError(response, "Invalid token claims");
                return;
            }

            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                userRepository.findByEmail(email)
                        .ifPresentOrElse(
                                user -> setAuthentication(user, request),
                                () -> sendError(response, "User not found")
                        );
            }

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            sendError(response, "Authentication failed: " + e.getMessage());
        }
    }

    private void setAuthentication(User user, HttpServletRequest request) {
        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(user.getRole().name())
                .build();

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

        authToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);
    }

    private void sendError(HttpServletResponse response, String message) {
        try {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"" + message + "\"}");
        } catch (IOException e) {
            logger.error("Failed to send error response", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
