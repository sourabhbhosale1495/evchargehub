package com.evchargehub.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.evchargehub.backend.entity.Booking;
import com.evchargehub.backend.entity.User;
import com.evchargehub.backend.service.BookingService;
import com.evchargehub.backend.service.UserService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import com.evchargehub.backend.entity.Payment;
import com.evchargehub.backend.service.PaymentService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;
    private final BookingService bookingService;
    private final PaymentService paymentService;

    @PersistenceContext
    private EntityManager entityManager;

    public AdminController(
            UserService userService,
            BookingService bookingService,
            PaymentService paymentService) {

        this.userService = userService;
        this.bookingService = bookingService;
        this.paymentService = paymentService;
    }

    // =====================================
    // ADMIN DASHBOARD STATISTICS
    // =====================================

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Long>> getDashboardStatistics() {

        Long totalUsers =
                ((Number) entityManager
                        .createNativeQuery("SELECT COUNT(*) FROM users")
                        .getSingleResult())
                        .longValue();

        Long totalStations =
                ((Number) entityManager
                        .createNativeQuery("SELECT COUNT(*) FROM charging_station")
                        .getSingleResult())
                        .longValue();

        Long totalBooking =
                ((Number) entityManager
                        .createNativeQuery("SELECT COUNT(*) FROM booking")
                        .getSingleResult())
                        .longValue();

        Map<String, Long> stats = new HashMap<>();

        stats.put("totalUsers", totalUsers);
        stats.put("totalStations", totalStations);
        stats.put("totalBooking", totalBooking);

        System.out.println("===== DASHBOARD STATISTICS =====");
        System.out.println("Total Users: " + totalUsers);
        System.out.println("Total Stations: " + totalStations);
        System.out.println("Total Bookings: " + totalBooking);
        System.out.println("================================");

        return ResponseEntity.ok(stats);
    }

    // =====================================
    // ADMIN - GET ALL USERS
    // =====================================

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    // =====================================
    // ADMIN - UPDATE USER
    // =====================================

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser) {

        return ResponseEntity.ok(
                userService.updateUser(id, updatedUser)
        );
    }

    // =====================================
    // ADMIN - ACTIVATE / DEACTIVATE USER
    // =====================================

    @PutMapping("/users/{id}/status")
    public ResponseEntity<User> updateUserStatus(
            @PathVariable Long id,
            @RequestParam boolean active) {

        return ResponseEntity.ok(
                userService.updateUserStatus(id, active)
        );
    }

    // =====================================
    // ADMIN - DELETE USER
    // =====================================

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok(
                "User deleted successfully"
        );
    }

    // =====================================
    // ADMIN - GET ALL BOOKINGS
    // =====================================

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {

        return ResponseEntity.ok(
                bookingService.getAllBookings()
        );
    }

    // =====================================
    // ADMIN - CANCEL BOOKING
    // =====================================

    @PutMapping("/bookings/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(
            @PathVariable Long id) {

        try {

            return ResponseEntity.ok(
                    bookingService.cancelBooking(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    // =====================================
    // ADMIN - DELETE BOOKING
    // =====================================

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Void> deleteBooking(
            @PathVariable Long id) {

        try {

            bookingService.deleteBooking(id);

            return ResponseEntity.noContent().build();

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }
    
	 // =====================================
	 // ADMIN - GET ALL PAYMENTS
	 // =====================================
	
	 @GetMapping("/payments")
	 public ResponseEntity<List<Payment>> getAllPayments() {
	
	     return ResponseEntity.ok(
	             paymentService.getAllPayments()
	     );
	 }
	
	 // =====================================
	 // ADMIN - DELETE PAYMENT
	 // =====================================
	
	 @DeleteMapping("/payments/{id}")
	 public ResponseEntity<Void> deletePayment(
	         @PathVariable Long id) {
	
	     try {
	         paymentService.deletePayment(id);
	
	         return ResponseEntity.noContent().build();
	
	     } catch (RuntimeException e) {
	         return ResponseEntity.notFound().build();
	     }
	 }
}