package com.project.controller;

import com.project.entity.AuthRequest;
import com.project.entity.User;
import com.project.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/login")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping
    public String login(@RequestBody AuthRequest authRequest) {
        String username = authRequest.getUsername();
        String password = authRequest.getPassword();

        try {
        	UserDetails userDetails = userService.loadUserByUsername(username);

        	if (userDetails != null && userDetails.getPassword().equals(password)) {
                return "Login successful!";
            } else {
                return "Invalid credentials";
            }
        } catch (UsernameNotFoundException e) {
            return "Invalid credentials";
        }
    }






}
