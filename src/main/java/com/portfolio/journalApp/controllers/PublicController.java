package com.portfolio.journalApp.controllers;

import com.portfolio.journalApp.entity.User;
import com.portfolio.journalApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
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
            User savedEntry = userService.save(myEntry);
            return new ResponseEntity<>(savedEntry, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("sum")
    public int returnSum(@RequestBody NumberRequest request) {
        return request.getNumber() * 2;
    }

    public static class NumberRequest {
        private int number;
        public int getNumber() { return number; }
        public void setNumber(int number) { this.number = number; }
    }
}
