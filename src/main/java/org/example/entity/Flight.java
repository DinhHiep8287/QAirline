package org.example.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.constant.FlightStatus;
import org.example.constant.SeatStatus;

import java.sql.Date;

@Table(name = "FLIGHT")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Flight extends BaseObject{
    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "START_TIME", nullable = false)
    private Date startTime;

    @Column(name = "END_TIME", nullable = false)
    private Date endTime;

    @Column(name = "STATUS", nullable = false)
    private FlightStatus status;

    @Column(name = "DEPARTURE", nullable = false)
    private String departure;

    @Column(name = "DEPARTURE_CODE", nullable = false)
    private String departureCode;

    @Column(name = "ARRIVAL", nullable = false)
    private Date arrival;

    @Column(name = "ARRIVAL_CODE", nullable = false)
    private Date arrivalCode;

    @Column(name = "GATE", nullable = false)
    private Date gate;
}
