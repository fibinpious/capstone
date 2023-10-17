package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.project.entity.Bug;
import com.project.entity.Project;
import com.project.entity.User;
import com.project.repository.BugRepository;
import com.project.repository.ProjectRepository;
import com.project.repository.UserRepository;

@Service
public class BugService {
    @Autowired
    private BugRepository bugRepository;
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired 
    private UserRepository userRepository;

    public List<Bug> getAllBugs() {
        return bugRepository.findAll();
    }

    public Bug getBugById(Long id) {
        Optional<Bug> temp = bugRepository.findById(id);
        Bug bug = null;
        if(temp.isPresent()) {
            bug = temp.get();
        }
        return bug;
    }


    public Bug addBug(Bug bug) {
        return bugRepository.save(bug);
    }

  public Bug updateBug(Bug bug) {
	  Bug newBug =getBugById(bug.getId());
	  if(newBug != null) {
		  newBug = bug;
		  bugRepository.save(newBug);
	  }
	  return newBug;
	  
  }



    public void deleteBug(Long id) {
        bugRepository.deleteById(id);
    }

    public List<Bug> getBugsForProject(Long projectId) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            return project.getBugs();
        }
        return null;
    }

    public void assignUserToBug(Long bugId, Long userId) {
        Optional<Bug> bugOptional = bugRepository.findById(bugId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (bugOptional.isPresent() && userOptional.isPresent()) {
            Bug bug = bugOptional.get();
            User user = userOptional.get();

            bug.setAssignee(user);
            bugRepository.save(bug);
        }
    }
    public List<Bug> getBugsAssignedToUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);

        return userOptional.map(User::getAssignedBugs).orElse(null);
    }

    public void markBugAsResolved(Long bugId) {
        Optional<Bug> bugOptional = bugRepository.findById(bugId);

        if (bugOptional.isPresent()) {
            Bug bug = bugOptional.get();
            bug.setResolved(true);
            bugRepository.save(bug);
        }
    }
    public List<Bug> getBugsAssignedToDeveloper(Long developerId) {
        Optional<User> developerOptional = userRepository.findById(developerId);

        return developerOptional.map(User::getAssignedBugs).orElse(null);
    }
 

    public List<Object[]> getAssignedUsersAndBugIds() {
        return bugRepository.findAssignedUsersAndBugIds();
    }
}
