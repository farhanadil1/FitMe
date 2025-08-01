package com.fitme.backend.services;

import com.fitme.backend.models.Posts;

import java.util.List;

public interface IPostsService {
    List<Posts> getAllPosts();
    Posts createPost(String content, String mediaUrl, int userId);
    void likePost(Long postId);
    void unlikePost(Long postId);
    void deletePost(long postId);
}
