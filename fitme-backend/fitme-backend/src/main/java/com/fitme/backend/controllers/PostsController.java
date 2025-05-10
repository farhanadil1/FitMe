package com.fitme.backend.controllers;

import com.fitme.backend.models.Posts;
import com.fitme.backend.services.PostsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/posts")
public class PostsController {

    @Autowired private PostsService postService;

    @GetMapping("/")
    public List<Posts> getPosts() {
        return postService.getAllPosts();
    }

    @PostMapping("/create")
    public Posts createPost(@RequestBody Map<String, String> body) {
        String content = body.get("content");
        String mediaUrl = body.getOrDefault("mediaUrl", null);
        int userId = Integer.parseInt(body.get("userId"));
        return postService.createPost(content, mediaUrl, userId);
    }

    @PostMapping("/{id}/like")
    public void like(@PathVariable Long id) {
        postService.likePost(id);
    }

    @PostMapping("/{id}/unlike")
    public void unlike(@PathVariable Long id) {
        postService.unlikePost(id);
    }
    @DeleteMapping("delete/{id}")
    public void deletePost(@PathVariable int id) {
        postService.deletePost(id);
    }
}
