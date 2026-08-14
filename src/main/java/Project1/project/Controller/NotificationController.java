package Project1.project.Controller;

import Project1.project.Model.Notification;
import Project1.project.Service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notification")
@CrossOrigin
public class NotificationController {

    @Autowired
    NotificationService service;

    @PostMapping("/add")
    public Notification add(
            @RequestBody Notification n
    ){

        return service.save(n);

    }

    @GetMapping("/{userId}")
    public List<Notification> getAll(
            @PathVariable Long userId
    ){

        return service.getByUser(userId);

    }
}