package org.example.controller;

import org.example.constant.FlightStatus;
import org.example.entity.Flight;
import org.example.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

public class FlightController {
    @Autowired
    FlightService flightService;

    @GetMapping(value = "/conditions")
    public ResponseEntity<?> getByConditions(@RequestParam String flightName
            , @RequestParam Date dateFrom, @RequestParam Date dateTo, @RequestParam String departure
            , @RequestParam String arrival, @RequestParam Integer pageNum, @RequestParam Integer pageSize) {
        try {
            Pageable pageable = PageRequest.of(pageNum, pageSize);
            List<Flight> flightList = flightService
                    .findByConditions(flightName, dateFrom, dateTo, departure, arrival, pageable);
            if (ObjectUtils.isEmpty(flightList)) {
                return ResponseEntity.badRequest()
                        .body("Not found");
            } else {
                return ResponseEntity.ok().body(flightList);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Server Error");
        }
    }

    @GetMapping(value = "/all")
    public ResponseEntity<?> getAll(@RequestParam Integer pageNum
            , @RequestParam Integer pageSize) {
        try {
            Pageable pageable = PageRequest.of(pageNum, pageSize);
            List<Flight> flightList = flightService
                    .findAll(pageable);
            if (ObjectUtils.isEmpty(flightList)) {
                return ResponseEntity.badRequest()
                        .body("Not found");
            } else {
                return ResponseEntity.ok().body(flightList);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Server Error");
        }
    }

    @GetMapping(value = "/id")
    public ResponseEntity<?> getById(@RequestParam Integer id) {
        try {
            Flight transaction = flightService.findById(id);
            if (ObjectUtils.isEmpty(transaction)) {
                return ResponseEntity.badRequest()
                        .body("Not found");
            } else {
                return ResponseEntity.ok().body(transaction);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Server Error");
        }
    }

    @PostMapping
    public ResponseEntity<?> saveFlight(@RequestBody Flight transaction) {
        try {
            transaction.setId(null);
            Flight savedFlight = flightService.save(transaction);
            if (ObjectUtils.isEmpty(transaction)) {
                return ResponseEntity.badRequest()
                        .body("Not found");
            } else {
                return ResponseEntity.ok().body(savedFlight);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Server Error");
        }
    }

    @PutMapping
    public ResponseEntity<?> editFlight(@RequestBody Flight transaction) {
        try {
            Flight editedFlight = flightService.save(transaction);
            if (ObjectUtils.isEmpty(transaction)) {
                return ResponseEntity.badRequest()
                        .body("Not found");
            } else {
                return ResponseEntity.ok().body(editedFlight);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Server Error");
        }
    }

    @PutMapping(value = "/list")
    public ResponseEntity<?> editFlights(@RequestBody List<Flight> transactions) {
        try {
            for(Flight transaction : transactions){
                Flight savedFlight = flightService.save(transaction);
            }
            return ResponseEntity.ok().body("Edited");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Server Error");
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteFlight(@RequestParam Integer id) {
        try {
            if (ObjectUtils.isEmpty(flightService.findById(id))) {
                return ResponseEntity.badRequest()
                        .body("Not found");
            } else {
                flightService.delete(id);
                return ResponseEntity.ok().body("Deleted");
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Server Error");
        }
    }

    @GetMapping(value = "/status")
    public ResponseEntity<?> getByStatus(@RequestParam FlightStatus statusEnum) {
        try {
            List<Flight> transaction = flightService.findByStatus(statusEnum);
            if (ObjectUtils.isEmpty(transaction)) {
                return ResponseEntity.badRequest()
                        .body("Not found");
            } else {
                return ResponseEntity.ok().body(transaction);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Server Error");
        }
    }
}
