package com.firstAPI.demo.services;

import com.firstAPI.demo.entity.User;
import com.firstAPI.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    Authentication Authentication = SecurityContextHolder.getContext().getAuthentication();
    
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public User saveNewUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Arrays.asList("USER"));
        return userRepository.save(user);
    }

    public void saveUser(User user){
        userRepository.save(user);
    }

    public void saveAdmin(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Arrays.asList("USER", "ADMIN"));
        userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll(); //FOR ADMIN USER ROLE
    }
    public User findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public void deleteByUserName(String userName) {
        userRepository.deleteByUserName(userName);
    }
    public String verify(User user) {
        User dbUser = userRepository.findByUserName(user.getUserName());

        if (dbUser == null) {
            throw new RuntimeException("User not found");
        }

        // Compare passwords using BCrypt
        if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Generate JWT token for this user
        return jwtService.generateToken(dbUser.getUserName());
    }

}
