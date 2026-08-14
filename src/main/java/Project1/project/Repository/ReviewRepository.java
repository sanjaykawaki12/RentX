package Project1.project.Repository;

import Project1.project.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository
        extends JpaRepository<Review,Long> {

    List<Review> findByVehicleId(Long vehicleId);

}