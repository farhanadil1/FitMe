package com.fitme.backend.services;

import com.fitme.backend.models.*;
import com.fitme.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReplyService implements IReplyService {

    @Autowired private IPostRepository postRepository;
    @Autowired private IReplyRepository replyRepository;
    @Autowired private IUsersrepository usersRepository;

    @Override
    public Reply addReply(Long postId, String content, int userId) {
        Posts post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        Reply reply = new Reply();
        reply.setPost(post);
        reply.setUser(user);
        reply.setContent(content);
        reply.setTimestamp(LocalDateTime.now());
        return replyRepository.save(reply);
    }

    @Override
    public void deleteReply(long id) {
        replyRepository.deleteById(id);
    }
}
