package com.project.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.entity.Bug;
import com.project.exception.ResourceNotFoundException;
import com.project.repository.BugRepository;
import com.project.service.BugService;

@RestController
@CrossOrigin("*")
@RequestMapping("/bugs")
public class BugController {
    @Autowired
    private BugService bugService;
    
    @Autowired
    private BugRepository bugRepository;

    @GetMapping
    public List<Bug> getAllBugs() {
        return bugService.getAllBugs();
    }
    
    @GetMapping("/{id}")
    public Bug getBugById(@PathVariable Long id) {
        return bugService.getBugById(id);
    }


    @PostMapping
    public Bug addBug(@RequestBody Bug bug) {
        return bugService.addBug(bug);
    }

    @PutMapping("/update/{bugId}")
    public void updateBug(@PathVariable Long bugId, @RequestBody Bug bug) {
        bugService.updateBug(bug);
    }

    @DeleteMapping("/{id}")
    public void deleteBug(@PathVariable Long id) {
        bugService.deleteBug(id);
    }
    @GetMapping("/projects/{projectId}/bugs")
    public List<Bug> getBugsForProject(@PathVariable Long projectId) {
        return bugService.getBugsForProject(projectId);
    }
    @PutMapping("/{bugId}/assign/{userId}")
    public void assignBugToUser(@PathVariable Long bugId, @PathVariable Long userId) {
        bugService.assignUserToBug(bugId, userId);
    }
    @GetMapping("/assigned/{developerId}")
    public List<Bug> getBugsAssignedToDeveloper(@PathVariable Long developerId) {
        return bugService.getBugsAssignedToDeveloper(developerId);
    }

 
    @GetMapping("/assignedUsersAndBugIds")
    public ResponseEntity<List<Object[]>> getAssignedUsersAndBugIds() {
        List<Object[]> assignedUsersAndBugIds = bugService.getAssignedUsersAndBugIds();
        return ResponseEntity.ok(assignedUsersAndBugIds);
    }
    @PutMapping("/{bugId}/update-status")
    public ResponseEntity<Bug> updateBugStatus(@PathVariable Long bugId, @RequestBody Map<String, String> statusMap) {
        String newStatus = statusMap.get("status");

        // Retrieve the bug from the database
        Bug bug = bugRepository.findById(bugId)
                .orElseThrow(() -> new ResourceNotFoundException("Bug not found with id: " + bugId));

        // Update the status
        bug.setStatus(newStatus);

        // Save the updated bug
        bug = bugRepository.save(bug);

        return ResponseEntity.ok(bug);
    }
}
