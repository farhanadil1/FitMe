package com.fitme.backend.services;

import com.fitme.backend.models.*;
import com.fitme.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostsService implements IPostsService {

    @Autowired private IPostRepository postRepository;
    @Autowired private IUsersrepository usersRepository;

    @Override
    public List<Posts> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Posts createPost(String content, String mediaUrl, int userId) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found for ID: " + userId));
        
        Posts post = new Posts();
        post.setUser(user);
        post.setContent(content);
        post.setMediaUrl(mediaUrl);
        post.setLikes(0); // Initialize likes

        return postRepository.save(post);
    }

    @Override
    public void likePost(Long postId) {
        Posts post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found for ID: " + postId));
        post.setLikes(post.getLikes() + 1);
        postRepository.save(post);
    }

    @Override
    public void unlikePost(Long postId) {
        Posts post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found for ID: " + postId));
        post.setLikes(Math.max(0, post.getLikes() - 1));
        postRepository.save(post);
    }

    @Override
    public void deletePost(long postId) {
        postRepository.deleteById(postId);
    }
}
