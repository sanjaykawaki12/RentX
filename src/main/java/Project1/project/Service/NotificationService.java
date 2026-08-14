package Project1.project.Service;

import Project1.project.Model.Notification;
import Project1.project.Repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    NotificationRepository repo;

    public Notification save(
            Notification n
    ){

        return repo.save(n);

    }

    public List<Notification>
    getByUser(Long userId){

        return repo.findByUserId(userId);

    }

}