package com.project.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long id;
    
    @Column(name = "project_name")
    private String name;
    
    @Column(name = "project_description")
    private String description;
    
    // Additional attributes for Project (e.g., status, start date, end date, etc.)
    
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Bug> bugs;

    // Constructors, Getters, and Setters

    // Constructors
    public Project() {}

    public Project(String name, String description) {
        this.name = name;
        this.description = description;
    }

	public Project(Long id, String name, String description, List<Bug> bugs) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.bugs = bugs;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Bug> getBugs() {
		return bugs;
	}

	public void setBugs(List<Bug> bugs) {
		this.bugs = bugs;
	}

	@Override
	public String toString() {
		return "Project [id=" + id + ", name=" + name + ", description=" + description + ", bugs=" + bugs + "]";
	}
    
    

    // Getters and Setters
    // (Omitted for brevity)
	
}
