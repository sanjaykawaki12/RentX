package Project1.project.Model;

import jakarta.persistence.*;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long vehicleId;

    private String username;

    private int rating;

    private String comment;

    public Long getId() {
        return id;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public String getUsername() {
        return username;
    }

    public int getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}