package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
