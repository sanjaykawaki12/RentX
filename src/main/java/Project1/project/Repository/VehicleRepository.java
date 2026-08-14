package Project1.project.Repository;

import Project1.project.Model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByProviderId(Long providerId);
}