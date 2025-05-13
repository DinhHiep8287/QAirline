package org.example.serviceImpl;

import org.example.entity.Seat;
import org.example.repository.SeatRepository;
import org.example.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatServiceImpl implements SeatService {
    @Autowired
    SeatRepository seatRepository;

    @Override
    public List<Seat> findByConditions(String name, Integer planeId, Boolean haveWindow, Pageable pageable) {
        return seatRepository.findByNameContainsAndPlaneIdAndHaveWindowAndDeletedFalse(name, planeId, haveWindow, pageable).getContent();
    }

    @Override
    public Seat findById(Integer id) {
        return seatRepository.findByIdAndIsDeletedFalse(id);
    }

    @Override
    public List<Seat> findAll(Pageable pageable) {
        return seatRepository.findByIsDeletedFalse(pageable).getContent();
    }

    @Override
    public boolean existsById(Integer id) {
        return seatRepository.existsByIdAndIsDeletedFalse(id);
    }

    @Override
    public void deletesById(Integer id) {
        Seat seat = seatRepository.findById(String.valueOf(id)).get();
        seat.setDeleted(false);
        seatRepository.save(seat);
    }

    @Override
    public Seat save(Seat seat) {
        return seatRepository.save(seat);
    }
}
