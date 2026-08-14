package Project1.project.Service;

import Project1.project.Model.User;
import Project1.project.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public User register(User user) {
        return repo.save(user);
    }

    public User login(String email, String password) {
        return repo.findByEmail(email)
                .filter(u -> u.getPassword().equals(password))
                .orElse(null);
    }
    public List<User> getAllUsers(){

        return repo.findAll();

    }
}