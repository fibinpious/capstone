package com.project.controller;

import com.project.entity.AuthRequest;
import com.project.entity.Bug;
import com.project.entity.User;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.create(user);
    }


    @PostMapping("/login")
    public LoginResponse login(@RequestBody AuthRequest authRequest) {
        String username = authRequest.getUsername();
        String password = authRequest.getPassword();

        try {
            UserDetails userDetails = userService.loadUserByUsername(username);

            if (userDetails != null && userDetails.getPassword().equals(password)) {
                return new LoginResponse("Login successful!", userDetails);
            } else {
                return new LoginResponse("Invalid credentials");
            }
        } catch (UsernameNotFoundException e) {
            return new LoginResponse("Invalid credentials");
        }
    }


    @GetMapping
    public List<User> getUsers() {
        return userService.read();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.read(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.update(user);
    }

    @DeleteMapping("/{id}")
    public User deleteUser(@PathVariable Long id) {
        return userService.delete(id);
    }
    
    @PostMapping("/assign-bug/{userId}/{bugId}")
    public User assignBugToUser(@PathVariable Long userId, @PathVariable Long bugId) {
        return userService.assignBugToUser(userId, bugId);
    }
    

    @PutMapping("/resolve-bug/{bugId}")
    public Bug markBugAsResolved(@PathVariable Long bugId) {
        return userService.markBugAsResolved(bugId);
    }
    
    @GetMapping("/developers")
    public List<User> getDevelopers() {
        return userService.getDevelopers();
    }

  
}
