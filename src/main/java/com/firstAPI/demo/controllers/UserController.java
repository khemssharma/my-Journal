package com.firstAPI.demo.controllers;
import com.firstAPI.demo.entity.User;
import com.firstAPI.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        try {
            Authentication Authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = Authentication.getName();
            User userInDB = userService.findByUserName(username);
            if (userInDB != null){
                userInDB.setUserName(user.getUserName());
                userInDB.setPassword(passwordEncoder.encode(user.getPassword()));
                userService.saveUser(userInDB);
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            throw new RuntimeException("Error updating user", e);
        }
    }
    @DeleteMapping
    public ResponseEntity<?> deleteUser() {
        try {
            Authentication Authentication = SecurityContextHolder.getContext().getAuthentication();
            userService.deleteByUserName(Authentication.getName());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting user", e);
        }
    }
}
