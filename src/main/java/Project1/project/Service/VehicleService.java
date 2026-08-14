package Project1.project.Service;

import Project1.project.Model.Vehicle;
import Project1.project.Repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository repo;

    public Vehicle addVehicle(Vehicle v) {
        return repo.save(v);
    }

    public List<Vehicle> getAllVehicles() {
        return repo.findAll();
    }
    public void deleteVehicle(Long id){

        repo.deleteById(id);

    }
    public Vehicle updateVehicle(
            Long id,
            Vehicle updatedVehicle
    ){

        Vehicle vehicle =
                repo.findById(id).orElse(null);

        if(vehicle != null){

            vehicle.setName(
                    updatedVehicle.getName());

            vehicle.setType(
                    updatedVehicle.getType());

            vehicle.setPrice(
                    updatedVehicle.getPrice());

            return repo.save(vehicle);
        }

        return null;
    }
}