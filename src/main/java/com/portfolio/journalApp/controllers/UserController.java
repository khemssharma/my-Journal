package com.portfolio.journalApp.controllers;
import com.portfolio.journalApp.entity.User;
import com.portfolio.journalApp.repository.UserRepository;
import com.portfolio.journalApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAll(){
        return userService.findAll();
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        try {
            Authentication Authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = Authentication.getName();
            User userInDB = userService.findByUserName(username);
            if (userInDB != null){
                userInDB.setUserName(user.getUserName());
                userInDB.setPassword(user.getPassword());
                userService.save(userInDB);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            throw new RuntimeException("Error updating user", e);
        }
    }
    @DeleteMapping
    public ResponseEntity<?> deleteUser() {
        try {
            Authentication Authentication = SecurityContextHolder.getContext().getAuthentication();
            userRepository.deleteByUserName(Authentication.getName());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting user", e);
        }
    }
}
