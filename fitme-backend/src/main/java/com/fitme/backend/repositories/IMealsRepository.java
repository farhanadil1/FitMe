package com.fitme.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fitme.backend.models.Meals;

@Repository
public interface IMealsRepository extends JpaRepository<Meals, Integer> {
    List<Meals> findByUserUserid(int userid);
}