package Project1.project.Controller;

import Project1.project.Model.Review;
import Project1.project.Service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
@CrossOrigin
public class ReviewController {

    @Autowired
    private ReviewService service;

    @PostMapping("/add")
    public Review addReview(
            @RequestBody Review review
    ){

        return service.addReview(review);

    }

    @GetMapping("/{vehicleId}")
    public List<Review> getReviews(
            @PathVariable Long vehicleId
    ){

        return service.getReviews(vehicleId);

    }
}