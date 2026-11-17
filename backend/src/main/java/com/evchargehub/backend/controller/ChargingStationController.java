package com.evchargehub.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.evchargehub.backend.entity.ChargingStation;
import com.evchargehub.backend.service.ChargingStationService;

@RestController
@RequestMapping("/api/stations")
public class ChargingStationController {

    private final ChargingStationService chargingStationService;

    public ChargingStationController(
            ChargingStationService chargingStationService) {

        this.chargingStationService = chargingStationService;
    }


    // ==============================
    // ADD STATION
    // ==============================

    @PostMapping
    public ResponseEntity<ChargingStation> addStation(
            @RequestBody ChargingStation station) {

        return ResponseEntity.ok(
                chargingStationService.addStation(station)
        );
    }


    // ==============================
    // GET ALL STATIONS
    // ==============================

    @GetMapping
    public ResponseEntity<List<ChargingStation>> getAllStations() {

        return ResponseEntity.ok(
                chargingStationService.getAllStations()
        );
    }


    // ==============================
    // GET STATION BY ID
    // ==============================

    @GetMapping("/{id}")
    public ResponseEntity<ChargingStation> getStationById(
            @PathVariable Long id) {

        return chargingStationService.getStationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // ==============================
    // UPDATE STATION
    // ==============================

    @PutMapping("/{id}")
    public ResponseEntity<ChargingStation> updateStation(
            @PathVariable Long id,
            @RequestBody ChargingStation station) {

        return ResponseEntity.ok(
                chargingStationService.updateStation(id, station)
        );
    }


    // ==============================
    // DELETE STATION
    // ==============================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStation(
            @PathVariable Long id) {

        chargingStationService.deleteStation(id);

        return ResponseEntity.noContent().build();
    }
}
