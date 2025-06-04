package org.example.service;

import org.example.constant.FlightStatus;
import org.example.entity.Flight;
import org.springframework.data.domain.Pageable;

import java.sql.Date;
import java.util.List;

public interface FlightService {
    List<Flight> findByConditions(String flightName, Date dateFrom, Date dateTo, String departure, String arrival, Pageable pageable);

    List<Flight> findAll(Pageable pageable);

    Flight findById(Integer id);

    Flight save(Flight flight);

    void delete(Integer id);

    List<Flight> findByStatus(FlightStatus statusEnum);
}
