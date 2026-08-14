package Project1.project.Repository;

import Project1.project.Model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository
        extends JpaRepository<Notification,Long>{

    List<Notification>
    findByUserId(Long userId);

}