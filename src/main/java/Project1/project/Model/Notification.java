package Project1.project.Model;

import jakarta.persistence.*;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy =
            GenerationType.IDENTITY)

    private Long id;

    private Long userId;

    private String message;

    private String status;

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }

    public String getStatus() {
        return status;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}