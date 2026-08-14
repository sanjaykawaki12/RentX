package Project1.project.Service;

import Project1.project.Model.Booking;
import Project1.project.Repository.BookingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository repo;

    // ✅ BOOK VEHICLE

    public Booking bookVehicle(Booking b) {

        b.setStatus("PENDING");

        b.setPaymentStatus("SUCCESS");

        return repo.save(b);

    }

    // ✅ GET ALL BOOKINGS

    public List<Booking> getAllBookings(){

        return repo.findAll();

    }
    public Booking approveBooking(Long id){

        Booking booking =
                repo.findById(id).orElse(null);

        if(booking != null){

            booking.setStatus("APPROVED");

            return repo.save(booking);
        }

        return null;
    }

    public Booking rejectBooking(Long id){

        Booking booking =
                repo.findById(id).orElse(null);

        if(booking != null){

            booking.setStatus("REJECTED");

            return repo.save(booking);
        }

        return null;
    }

}