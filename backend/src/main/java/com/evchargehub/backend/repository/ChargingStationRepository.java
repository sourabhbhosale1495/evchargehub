package com.evchargehub.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.evchargehub.backend.entity.ChargingStation;


@Repository
public interface ChargingStationRepository extends JpaRepository<ChargingStation, Long> {
    Optional<ChargingStation> findByName(String name);

}
