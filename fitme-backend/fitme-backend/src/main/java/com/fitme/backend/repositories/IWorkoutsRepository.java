package com.fitme.backend.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fitme.backend.models.Workouts;

@Repository
public interface IWorkoutsRepository extends JpaRepository<Workouts, Integer> {
    List<Workouts> findByUserUserid(int userid);
}
