package org.example.repository;

import org.example.constant.FlightStatus;
import org.example.entity.Flight;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, String> {
    List<Flight> findByIsDeletedFalse(Pageable pageable);

    Flight findByIdAndIsDeletedFalse(Integer id);

    List<Flight> findByStatusAndIsDeletedFalse(FlightStatus statusEnum);

    List<Flight> findByIsDeletedFalseAndNameContainsAndStartTimeBetweenAndDepartureContainsAndArrivalContains
            (String flightName, Date dateFrom, Date dateTo, String departure, String arrival, Pageable pageable);
}
