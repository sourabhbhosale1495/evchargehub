
package com.evchargehub.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.evchargehub.backend.entity.Booking;
import com.evchargehub.backend.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // GET LOGGED-IN USER'S BOOKINGS
    @GetMapping
    public List<Booking> getMyBookings(
            Authentication authentication) {

        String email = authentication.getName();

        return bookingService.getBookingsByUserEmail(email);
    }

    // CREATE BOOKING FOR LOGGED-IN USER
    @PostMapping
    public Booking createBooking(
            @RequestBody Booking booking,
            Authentication authentication) {

        String email = authentication.getName();

        return bookingService.createBookingForUser(
                booking, email);
    }

    // GET BOOKING BY ID - OWNER ONLY
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        Optional<Booking> booking =
                bookingService.getBookingByIdForUser(
                        id, email);

        return booking.map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build());
    }

    // CANCEL BOOKING - OWNER ONLY
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        try {
            Booking booking =
                    bookingService.cancelBookingForUser(
                            id, email);

            return ResponseEntity.ok(booking);

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE BOOKING - OWNER ONLY
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        try {
            bookingService.deleteBookingForUser(
                    id, email);

            return ResponseEntity.noContent().build();

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // BACKWARD COMPATIBILITY WITH EXISTING FRONTEND
    // The userId in the URL is intentionally NOT trusted.
    // The logged-in user's email determines the bookings.

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(
            @PathVariable Long userId,
            Authentication authentication) {

        String email = authentication.getName();

        return bookingService.getBookingsByUserEmail(email);
    }
}
