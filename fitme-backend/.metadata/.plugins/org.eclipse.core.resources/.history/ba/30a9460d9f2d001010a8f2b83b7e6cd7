package com.fitme.backend.controllers;

import com.fitme.backend.models.Reply;
import com.fitme.backend.services.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/replies")
public class ReplyController {

    @Autowired private ReplyService replyService;

    @PostMapping("/{postId}")
    public Reply addReply(@PathVariable Long postId, @RequestBody Map<String, String> body) {
        String content = body.get("content");
        int userId = Integer.parseInt(body.get("userId"));
        return replyService.addReply(postId, content, userId);
    }
    @DeleteMapping("delete/{id}")
    public void deleteReply(@PathVariable int id) {
        replyService.deleteReply(id);
    }
}
