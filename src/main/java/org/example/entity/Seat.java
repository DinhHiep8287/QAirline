package org.example.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.constant.FlightStatus;
import org.example.constant.SeatStatus;
import org.example.constant.SeatType;

@Table(name = "SEAT")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Seat extends BaseObject{
    @Column(name = "NAME", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name="PLANE_ID", nullable=false)
    private Plane plane;

    @Column(name = "SEAT_TYPE", nullable = false)
    private SeatType type;

    @Column(name = "HAVE_WINDOW", nullable = false)
    private boolean haveWindow;

    @Column(name = "PICTURE_LINK")
    private String pictureLink;

    @Column(name = "SUMMARY")
    private String summary;
}
