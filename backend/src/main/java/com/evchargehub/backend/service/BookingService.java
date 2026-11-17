
package com.evchargehub.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.evchargehub.backend.entity.Booking;
import com.evchargehub.backend.entity.User;
import com.evchargehub.backend.entity.ChargingStation;
import com.evchargehub.backend.repository.BookingRepository;
import com.evchargehub.backend.repository.UserRepository;
import com.evchargehub.backend.repository.ChargingStationRepository;
import com.evchargehub.backend.repository.PaymentRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ChargingStationRepository chargingStationRepository;
    private final PaymentRepository paymentRepository;

    public BookingService(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            ChargingStationRepository chargingStationRepository,
            PaymentRepository paymentRepository) {

        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.chargingStationRepository = chargingStationRepository;
        this.paymentRepository = paymentRepository;
    }

    // CREATE BOOKING FOR LOGGED-IN USER
    public Booking createBookingForUser(
            Booking booking, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException("User not found"));

        if (booking.getChargingStation() == null
                || booking.getChargingStation().getId() == null) {
            throw new RuntimeException("Charging station is required");
        }

        ChargingStation station =
                chargingStationRepository.findById(
                        booking.getChargingStation().getId())
                .orElseThrow(
                        () -> new RuntimeException(
                                "Charging station not found"));

        // Never trust the user ID from the frontend
        booking.setUser(user);
        booking.setChargingStation(station);

        return bookingRepository.save(booking);
    }

    // GET ONLY LOGGED-IN USER'S BOOKINGS
    public List<Booking> getBookingsByUserEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException("User not found"));

        return bookingRepository.findByUser(user);
    }

    // GET A BOOKING ONLY IF IT BELONGS TO THE LOGGED-IN USER
    public Optional<Booking> getBookingByIdForUser(
            Long id, String email) {

        return bookingRepository.findById(id)
                .filter(booking ->
                        booking.getUser() != null
                        && booking.getUser().getEmail().equals(email));
    }

    // CANCEL ONLY THE LOGGED-IN USER'S BOOKING
    public Booking cancelBookingForUser(
            Long id, String email) {

        Booking booking = getBookingByIdForUser(id, email)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Booking not found"));

        booking.setStatus("CANCELLED");

        return bookingRepository.save(booking);
    }

    // DELETE ONLY THE LOGGED-IN USER'S BOOKING
    @Transactional
    public void deleteBookingForUser(
            Long id, String email) {

        Booking booking = getBookingByIdForUser(id, email)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Booking not found"));

        // Delete associated payment first
        paymentRepository.deleteByBooking(booking);

        // Then delete the booking
        bookingRepository.delete(booking);
    }

    // =====================================
    // ADMIN METHODS - KEEP EXISTING WORKING
    // =====================================

    // GET ALL BOOKINGS (ADMIN)
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // GET BOOKING BY ID (ADMIN)
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    // UPDATE BOOKING (ADMIN)
    public Booking updateBooking(
            Long id, Booking bookingDetails) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Booking not found"));

        booking.setBookingTime(bookingDetails.getBookingTime());
        booking.setDuration(bookingDetails.getDuration());
        booking.setTotalAmount(bookingDetails.getTotalAmount());
        booking.setStatus(bookingDetails.getStatus());
        booking.setUser(bookingDetails.getUser());
        booking.setChargingStation(
                bookingDetails.getChargingStation());

        return bookingRepository.save(booking);
    }

    // CANCEL BOOKING (ADMIN)
    public Booking cancelBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Booking not found"));

        booking.setStatus("CANCELLED");

        return bookingRepository.save(booking);
    }

    // DELETE BOOKING (ADMIN)
    @Transactional
    public void deleteBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Booking not found"));

        paymentRepository.deleteByBooking(booking);
        bookingRepository.delete(booking);
    }

    // GET BOOKINGS BY USER ID (ADMIN)
    public List<Booking> getBookingsByUserId(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"));

        return bookingRepository.findByUser(user);
    }
}