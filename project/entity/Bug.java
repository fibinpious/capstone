package com.project.entity;

import javax.persistence.*;



@Entity
@Table(name = "bugs")
public class Bug {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bug_id")
    private Long id;

    @Column(name = "bug_name")
    private String name;

    @Column(name = "bug_description")
    private String description;
    
    @Column(name = "bug_resolved")
    private Boolean resolved;

    @ManyToOne
    @JoinColumn(name = "assignee_id") // This is the foreign key referring to the User
    private User assignee;

    
    @ManyToOne
    @JoinColumn(name = "project_id") // This is the foreign key referring to the Project
    private Project project;
    // Constructors, Getters, and Setters
    
    @Column(name = "bug_status")
    private String status;
    
    @Column(name = "bug_priority")
    private String priority;


    // Constructors
    public Bug() {}


    public String getPriority() {
		return priority;
	}


	public void setPriority(String priority) {
		this.priority = priority;
	}


	public Boolean getResolved() {
		return resolved;
	}


	public Bug(Long id, String name, String description, Boolean resolved, User assignee, Project project,
			String status, String priority) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.resolved = resolved;
		this.assignee = assignee;
		this.project = project;
		this.status = status;
		this.priority = priority;
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

    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }
    

    public boolean isResolved() {
        return resolved != null && resolved;
    }

    public void setResolved(Boolean resolved) {
        this.resolved = resolved;
    }
    
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


	@Override
	public String toString() {
		return "Bug [id=" + id + ", name=" + name + ", description=" + description + ", resolved=" + resolved
				+ ", assignee=" + assignee + ", project=" + project + ", status=" + status + ", priority=" + priority
				+ "]";
	}
    

    
}
