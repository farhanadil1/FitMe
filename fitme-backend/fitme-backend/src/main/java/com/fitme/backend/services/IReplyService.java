package com.fitme.backend.services;

import com.fitme.backend.models.Reply;

public interface IReplyService {
    Reply addReply(Long postId, String content, int userId);
    void deleteReply(long id);
}
