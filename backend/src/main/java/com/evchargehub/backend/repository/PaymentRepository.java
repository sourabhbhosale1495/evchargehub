package com.evchargehub.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.evchargehub.backend.entity.Payment;
import com.evchargehub.backend.entity.Booking;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByBooking(Booking booking);
    
    void deleteByBooking(Booking booking);

}