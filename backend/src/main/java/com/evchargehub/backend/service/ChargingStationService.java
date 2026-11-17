package com.evchargehub.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.evchargehub.backend.entity.ChargingStation;
import com.evchargehub.backend.repository.BookingRepository;
import com.evchargehub.backend.repository.ChargingStationRepository;

@Service
public class ChargingStationService {

    private final ChargingStationRepository chargingStationRepository;
    private final BookingRepository bookingRepository;


    public ChargingStationService(
            ChargingStationRepository chargingStationRepository,
            BookingRepository bookingRepository) {

        this.chargingStationRepository = chargingStationRepository;
        this.bookingRepository = bookingRepository;
    }


    // ==============================
    // ADD STATION
    // ==============================

    public ChargingStation addStation(ChargingStation station) {

        return chargingStationRepository.save(station);
    }


    // ==============================
    // GET ALL STATIONS
    // ==============================

    public List<ChargingStation> getAllStations() {

        return chargingStationRepository.findAll();
    }


    // ==============================
    // GET STATION BY ID
    // ==============================

    public Optional<ChargingStation> getStationById(Long id) {

        return chargingStationRepository.findById(id);
    }


    // ==============================
    // UPDATE STATION
    // ==============================

    public ChargingStation updateStation(
            Long id,
            ChargingStation station) {

        ChargingStation existingStation =
                chargingStationRepository.findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Charging station not found"
                    )
                );


        existingStation.setName(
                station.getName()
        );

        existingStation.setLocation(
                station.getLocation()
        );

        existingStation.setLatitude(
                station.getLatitude()
        );

        existingStation.setLongitude(
                station.getLongitude()
        );

        existingStation.setChargerType(
                station.getChargerType()
        );

        existingStation.setTotalSlots(
                station.getTotalSlots()
        );

        existingStation.setAvailableSlots(
                station.getAvailableSlots()
        );

        existingStation.setPricePerUnit(
                station.getPricePerUnit()
        );

        existingStation.setActive(
                station.isActive()
        );


        return chargingStationRepository.save(
                existingStation
        );
    }


    // ==============================
    // DELETE STATION
    // ==============================

    public void deleteStation(Long id) {

        ChargingStation station =
                chargingStationRepository.findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Charging station not found"
                    )
                );

        // Only ACTIVE stations can be deleted
        if (!station.isActive()) {
            throw new RuntimeException(
                "Only active charging stations can be deleted"
            );
        }

        // Delete bookings related to this station
        bookingRepository.deleteByChargingStation(station);

        // Delete station
        chargingStationRepository.delete(station);
    }
}