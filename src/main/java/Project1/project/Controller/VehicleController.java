package Project1.project.Controller;

import Project1.project.Model.Vehicle;
import Project1.project.Service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/vehicle")
@CrossOrigin
public class VehicleController {

    @Autowired
    private VehicleService service;

    @PostMapping("/add")
    public Vehicle addVehicle(
            @RequestParam String name,
            @RequestParam String type,
            @RequestParam double price,
            @RequestParam Long providerId,
            @RequestParam MultipartFile image
    ) throws IOException {

        Vehicle v = new Vehicle();
        v.setName(name);
        v.setType(type);
        v.setPrice(price);
        v.setProviderId(providerId);
        v.setImage(image.getBytes());

        return service.addVehicle(v);
    }

    @GetMapping("/all")
    public List<Vehicle> getAll() {
        return service.getAllVehicles();
    }
    @DeleteMapping("/delete/{id}")
    public String deleteVehicle(
            @PathVariable Long id
    ){

        service.deleteVehicle(id);

        return "Vehicle Deleted";

    }
    @PutMapping("/update/{id}")
    public Vehicle updateVehicle(
            @PathVariable Long id,
            @RequestBody Vehicle vehicle
    ){

        return service.updateVehicle(id, vehicle);

    }
}
