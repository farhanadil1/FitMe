package com.fitme.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fitme.backend.models.Reply;

public interface IReplyRepository extends JpaRepository<Reply, Long> {}
