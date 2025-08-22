package com.firstAPI.demo.controllers;

import com.firstAPI.demo.entity.User;
import com.firstAPI.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200") 

public class AdminController {
    @Autowired
    private UserService userService;

    Authentication Authentication = SecurityContextHolder.getContext().getAuthentication();

    @GetMapping("all-users")
    public ResponseEntity<?> getAllUsers(){
        List<User> all = userService.findAll();
        if (all != null && !all.isEmpty()){
            return new ResponseEntity<>(all, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("create-admin-user")
    public void createUser(@RequestBody User user){
        userService.saveAdmin(user);
    }
}
