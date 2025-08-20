package com.firstAPI.demo.controllers;

import com.firstAPI.demo.entity.User;
import com.firstAPI.demo.services.UserDetailsServiceImpl;
import com.firstAPI.demo.services.UserService;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
@Slf4j
public class PublicController {

    @Autowired
    private UserService userService;

    @GetMapping("health-check")
    public String healthCheck(){
        return "ok";
    }

    @PostMapping("create-user")
    public ResponseEntity<User> createEntry(@RequestBody User myEntry){
        try {
            User savedEntry = userService.saveNewUser(myEntry);
            return new ResponseEntity<>(savedEntry, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("sum")
    public int returnSum(@RequestBody NumberRequest request) {
        return request.getNumber() * 2;
    }

    @Getter
    public static class NumberRequest {
        private int number;
        
    }
}
