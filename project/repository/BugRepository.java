package com.project.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // Import this
import org.springframework.data.repository.query.Param;

import com.project.entity.Bug;

public interface BugRepository extends JpaRepository<Bug, Long> {

    @Query("SELECT b FROM Bug b WHERE b.project.id = ?1")
    List<Bug> getBugsForProject(Long projectId);
    
    @Query("SELECT b FROM Bug b WHERE b.assignee.id = :developerId")
    List<Bug> getBugsAssignedToDeveloper(@Param("developerId") Long developerId);

    @Query("SELECT u.name AS userName, b.id AS bugId FROM User u JOIN Bug b ON u.id = b.assignee.id")
    List<Object[]> findAssignedUsersAndBugIds();
}
