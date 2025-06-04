package org.example.serviceImpl;

import org.example.constant.FlightStatus;
import org.example.entity.Flight;
import org.example.repository.FlightRepository;
import org.example.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

import java.sql.Date;
import java.util.List;

public class FlightServiceImpl implements FlightService {
    @Autowired
    FlightRepository flightRepository;

    @Override
    public List<Flight> findByConditions(String flightName, Date dateFrom, Date dateTo, String departure, String arrival, Pageable pageable) {
        return flightRepository.findByIsDeletedFalseAndNameContainsAndStartTimeBetweenAndDepartureContainsAndArrivalContains
                (flightName, dateFrom, dateTo, departure, arrival, pageable);
    }

    @Override
    public List<Flight> findAll(Pageable pageable) {
        return flightRepository.findByIsDeletedFalse(pageable);
    }

    @Override
    public Flight findById(Integer id) {
        return flightRepository.findByIdAndIsDeletedFalse(id);
    }

    @Override
    public Flight save(Flight flight) {
        return flightRepository.save(flight);
    }

    @Override
    public void delete(Integer id) {
        Flight flight = flightRepository.findByIdAndIsDeletedFalse(id);
        flight.setDeleted(true);
        flightRepository.save(flight);
    }

    @Override
    public List<Flight> findByStatus(FlightStatus statusEnum) {
        return flightRepository.findByStatusAndIsDeletedFalse(statusEnum);
    }
}
