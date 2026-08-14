package Project1.project.Controller;

import Project1.project.Model.Booking;
import Project1.project.Service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
@CrossOrigin

public class BookingController {

    @Autowired
    private BookingService service;

    @PostMapping("/book")
    public Booking book(
            @RequestBody Booking booking
    ) {

        return service.bookVehicle(booking);

    }

    // ✅ ALL BOOKINGS

    @GetMapping("/all")
    public List<Booking> getAllBookings(){

        return service.getAllBookings();

    }

    @PutMapping("/approve/{id}")
    public Booking approveBooking(
            @PathVariable Long id
    ){
        return service.approveBooking(id);
    }

    @PutMapping("/reject/{id}")
    public Booking rejectBooking(
            @PathVariable Long id
    ){
        return service.rejectBooking(id);
    }

}