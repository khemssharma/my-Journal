package com.firstAPI.demo.controllers;
import com.firstAPI.demo.entity.User;
import com.firstAPI.demo.services.JwtService;
import com.firstAPI.demo.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Slf4j
@CrossOrigin(origins = "http://localhost:4200") 

public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 🟢 Update user with JWT authentication
    @PutMapping
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String authHeader,
                                        @RequestBody User user) {
        try {
            // Extract token from "Bearer <token>"
            String token = authHeader.substring(7);
            String username = jwtService.extractUsername(token);

            User userInDB = userService.findByUserName(username);

            if (userInDB != null) {
                userInDB.setUserName(user.getUserName());
                userInDB.setPassword(passwordEncoder.encode(user.getPassword()));
                userService.saveUser(userInDB);
                return ResponseEntity.ok("User updated successfully");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

        } catch (Exception e) {
            log.error("Error updating user", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }
    }

    // 🟢 Delete user with JWT authentication
    @DeleteMapping
    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7);
            String username = jwtService.extractUsername(token);

            userService.deleteByUserName(username);
            return ResponseEntity.ok("User deleted successfully");

        } catch (Exception e) {
            log.error("Error deleting user", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }
    }
}
