package Project1.project.Service;

import Project1.project.Model.Review;
import Project1.project.Repository.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repo;

    public Review addReview(
            Review review
    ){

        return repo.save(review);

    }

    public List<Review> getReviews(
            Long vehicleId
    ){

        return repo.findByVehicleId(vehicleId);

    }
}