package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.entity.Bug;
import com.project.entity.User;
import com.project.exception.UserAlreadyExistException;
import com.project.repository.BugRepository;
import com.project.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BugRepository bugRepository;

    public User create(User user) {
        if (user.getId() != null) {
            Optional<User> existingUser = userRepository.findById(user.getId());
            if (existingUser.isPresent()) {
                throw new UserAlreadyExistException("There is already an user with id: " + user.getId());
            }
        }
        return userRepository.save(user);
    }

    public List<User> read() {
        return userRepository.findAll();
    }

    public User read(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User update(User user) {
        return userRepository.save(user);
    }

    public User delete(Long id) {
        User user = read(id);
        if (user != null) {
            userRepository.delete(user);
        }
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new CustomUserDetails(user);
    }
    public User assignBugToUser(Long userId, Long bugId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with id " + userId + " not found"));

        Bug bug = bugRepository.findById(bugId)
                .orElseThrow(() -> new IllegalArgumentException("Bug with id " + bugId + " not found"));

        user.addBug(bug);
        return userRepository.save(user);
    }
    public List<Bug> getBugsAssignedToUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with id " + userId + " not found"));
        return user.getAssignedBugs();
    }
    
    public Bug markBugAsResolved(Long bugId) {
        Bug bug = bugRepository.findById(bugId)
                .orElseThrow(() -> new IllegalArgumentException("Bug with id " + bugId + " not found"));

        bug.setResolved(true);
        return bugRepository.save(bug);
    }
    
    public List<User> getDevelopers() {
        return userRepository.findByRole("Developer");
    }



}
