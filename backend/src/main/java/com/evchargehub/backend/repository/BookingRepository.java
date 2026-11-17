package com.evchargehub.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.evchargehub.backend.entity.Booking;
import com.evchargehub.backend.entity.User;
import com.evchargehub.backend.entity.ChargingStation;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUser(User user);

    void deleteByUser(User user);

    // Find all bookings for a charging station
    List<Booking> findByChargingStation(ChargingStation chargingStation);

    // Delete all bookings for a charging station
    void deleteByChargingStation(ChargingStation chargingStation);
}