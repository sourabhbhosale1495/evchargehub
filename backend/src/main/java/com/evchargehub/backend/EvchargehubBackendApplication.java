package com.evchargehub.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import com.evchargehub.backend.entity.ChargingStation;
import com.evchargehub.backend.repository.ChargingStationRepository;

@SpringBootApplication
public class EvchargehubBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EvchargehubBackendApplication.class, args);
		
		System.out.println("Data base connection ready");
	}

	@Bean
	CommandLineRunner seedChargingStations(ChargingStationRepository stations) {
		return args -> {
			Object[][] sampleStations = {
				{"Connaught Place Fast Charge", "Connaught Place, New Delhi", 28.6315, 77.2167, "CCS2", 6, 4, 18.0},
				{"India Gate Green Point", "India Gate, New Delhi", 28.6129, 77.2295, "Type 2", 4, 3, 16.0},
				{"Karol Bagh Charge Hub", "Karol Bagh, New Delhi", 28.6514, 77.1907, "CCS2", 5, 4, 17.5},
				{"Dwarka Sector 21 Station", "Sector 21, Dwarka, New Delhi", 28.5523, 77.0583, "CHAdeMO", 4, 3, 19.0},
				{"Saket Metro Charging", "Saket, New Delhi", 28.5245, 77.2066, "Type 2", 6, 5, 15.0},
				{"Noida City Centre Charge", "Sector 32, Noida, Uttar Pradesh", 28.5744, 77.3560, "CCS2", 8, 6, 18.5},
				{"Gurugram Cyber Hub Station", "DLF Cyber City, Gurugram, Haryana", 28.4950, 77.0890, "CCS2", 6, 5, 20.0},
				{"Faridabad Green Charge", "Sector 15A, Faridabad, Haryana", 28.4089, 77.3178, "Type 2", 4, 4, 16.5},
				{"Ghaziabad Express Charger", "Indirapuram, Ghaziabad, Uttar Pradesh", 28.6415, 77.3715, "CCS2", 5, 4, 17.0},
				{"Greater Noida Eco Station", "Knowledge Park, Greater Noida, Uttar Pradesh", 28.4744, 77.4830, "CHAdeMO", 4, 3, 18.0}
			};
			for (Object[] row : sampleStations) {
				String name = (String) row[0];
				if (stations.findByName(name).isEmpty()) {
					ChargingStation station = new ChargingStation();
					station.setName(name);
					station.setLocation((String) row[1]);
					station.setLatitude((double) row[2]);
					station.setLongitude((double) row[3]);
					station.setChargerType((String) row[4]);
					station.setTotalSlots((int) row[5]);
					station.setAvailableSlots((int) row[6]);
					station.setPricePerUnit((double) row[7]);
					station.setActive(true);
					stations.save(station);
				}
			}
		};
	}
	
}
