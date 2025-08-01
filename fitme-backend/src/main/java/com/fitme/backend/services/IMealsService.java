package com.fitme.backend.services;

import com.fitme.backend.models.Meals;

import java.util.List;

public interface IMealsService {

    Meals saveMeal(Meals meal);

    List<Meals> getAllMealsByUserId(int userId);

    void deleteMeal(int id);

    Meals updateMeal(Meals meal);

    Meals getMealById(int id);

	int getTotalCaloriesByUserId(int userid);
}
