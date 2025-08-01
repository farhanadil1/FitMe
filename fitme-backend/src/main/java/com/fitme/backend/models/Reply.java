package com.fitme.backend.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "replies")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="content", length=200)
    private String content;
    @Column(name="timestamp", length=200)
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "postid")
    private Posts post;

    @ManyToOne
    @JoinColumn(name = "userid")
    private Users user;

	public Reply(String content, LocalDateTime timestamp, Posts post, Users user) {
		super();
		this.content = content;
		this.timestamp = timestamp;
		this.post = post;
		this.user = user;
	}

	public Reply() {
		this.id=null;
		this.content = null;
		this.timestamp = null;
		this.post = null;
		this.user = null;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public Posts getPost() {
		return post;
	}

	public void setPost(Posts post) {
		this.post = post;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

    
    
}
