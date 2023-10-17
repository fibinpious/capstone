package com.project.controller;

import org.springframework.security.core.userdetails.UserDetails;

public class LoginResponse {
    private String message;
    private UserDetails userDetails;

    public LoginResponse() {
    }

    // Constructor for successful login
    public LoginResponse(String message, UserDetails userDetails) {
        this.message = message;
        this.userDetails = userDetails;
    }

    // Constructor for invalid credentials
    public LoginResponse(String message) {
        this.message = message;
    }

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UserDetails getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
    }
}
