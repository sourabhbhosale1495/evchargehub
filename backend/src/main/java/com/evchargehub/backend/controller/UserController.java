package com.evchargehub.backend.controller;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.evchargehub.backend.dto.LoginResponse;
import com.evchargehub.backend.entity.User;
import com.evchargehub.backend.service.UserService;


import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;


    // =====================================
    // CONSTRUCTOR
    // =====================================

    public UserController(UserService userService) {
        this.userService = userService;
    }


    // =====================================
    // REGISTER USER
    // =====================================

    @PostMapping("/register")
    public ResponseEntity<User> createUser(
            @RequestBody User user) {

        User savedUser = userService.saveUser(user);

        return ResponseEntity.ok(savedUser);
    }


    // =====================================
    // USER / ADMIN LOGIN
    // =====================================

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody User user,
            HttpServletRequest request,
            HttpServletResponse response) {

        try {
            LoginResponse loginResponse =
                    userService.loginUser(
                            user.getEmail(),
                            user.getPassword()
                    );

            String role = loginResponse.getRole();

            if (role == null || role.isBlank()) {
                role = "USER";
            }

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            loginResponse.getEmail(),
                            null,
                            List.of(
                                    new SimpleGrantedAuthority(
                                            "ROLE_" + role.toUpperCase()
                                    )
                            )
                    );

            SecurityContext securityContext =
                    SecurityContextHolder.createEmptyContext();

            securityContext.setAuthentication(authentication);
            SecurityContextHolder.setContext(securityContext);

            // Save login authentication properly in the session
            HttpSessionSecurityContextRepository repository =
                    new HttpSessionSecurityContextRepository();

            repository.saveContext(
                    securityContext,
                    request,
                    response
            );

            return ResponseEntity.ok(loginResponse);

        } catch (Exception e) {
            SecurityContextHolder.clearContext();

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(e.getMessage() == null
                            ? "Invalid email or password"
                            : e.getMessage()));
        }
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleInvalidRegistration(IllegalArgumentException exception) {
        return ResponseEntity.badRequest().body(
                new ErrorResponse(exception.getMessage())
        );
    }


    // =====================================
    // GET ALL USERS
    // =====================================

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }


    // =====================================
    // GET USER BY ID
    // =====================================

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable Long id) {

        User user =
                userService.getUserById(id);

        return ResponseEntity.ok(user);
    }


    // =====================================
    // UPDATE USER
    // =====================================

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser) {

        User user =
                userService.updateUser(
                        id,
                        updatedUser
                );

        return ResponseEntity.ok(user);
    }


    // =====================================
    // DELETE USER
    // =====================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok(
                "User deleted successfully"
        );
    }


    // =====================================
    // ACTIVATE / DEACTIVATE USER
    // =====================================

    @PutMapping("/{id}/status")
    public ResponseEntity<User> updateUserStatus(
            @PathVariable Long id,
            @RequestParam boolean active) {

        User user =
                userService.updateUserStatus(
                        id,
                        active
                );

        return ResponseEntity.ok(user);
    }


    // =====================================
    // ERROR RESPONSE CLASS
    // =====================================

    static class ErrorResponse {

        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
