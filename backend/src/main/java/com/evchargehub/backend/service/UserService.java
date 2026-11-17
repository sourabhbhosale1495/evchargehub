package com.evchargehub.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.evchargehub.backend.dto.LoginResponse;
import com.evchargehub.backend.entity.Booking;
import com.evchargehub.backend.entity.User;
import com.evchargehub.backend.repository.BookingRepository;
import com.evchargehub.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            BookingRepository bookingRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // REGISTER
    public User saveUser(User user) {
		if (user.getName() == null || user.getName().isBlank()) {
			throw new IllegalArgumentException("Name is required");
		}
		if (user.getEmail() == null || user.getEmail().isBlank() || user.getPassword() == null || user.getPassword().length() < 8) {
			throw new IllegalArgumentException("A valid email and password of at least 8 characters are required");
		}
		if (userRepository.findByEmail(user.getEmail().trim().toLowerCase()).isPresent()) {
			throw new IllegalArgumentException("An account with this email already exists");
		}
		user.setEmail(user.getEmail().trim().toLowerCase());
		user.setRole("USER");
		user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // LOGIN
    public LoginResponse loginUser(String email, String password) {

        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            throw new IllegalArgumentException("Email and password are required");
        }

        User user = userRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() ->
                    new RuntimeException("Invalid email or password")
                );

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!user.isActive()) {
            throw new RuntimeException("Your account is inactive. Please contact the administrator.");
        }

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

    // GET ALL USERS
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET USER BY ID
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("User not found")
                );
    }

    // UPDATE USER
    public User updateUser(Long id, User updatedUser) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("User not found")
                );

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setPhone(updatedUser.getPhone());
        user.setRole(updatedUser.getRole());

        return userRepository.save(user);
    }

    // DELETE USER
    @Transactional
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("User not found")
                );

        // First delete all bookings belonging to this user
        bookingRepository.deleteByUser(user);

        // Then delete the user
        userRepository.delete(user);
    }
    
    public User updateUserStatus(Long id, boolean active) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setActive(active);

        return userRepository.save(user);
    }
}
