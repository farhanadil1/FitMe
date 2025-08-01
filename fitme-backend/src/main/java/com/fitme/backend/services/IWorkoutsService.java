package com.fitme.backend.services;

import java.util.List;

import com.fitme.backend.models.Workouts;

public interface IWorkoutsService {
    
    Workouts createWorkout(Workouts workout);
    
    Workouts updateWorkout(Workouts workout);
    
    String deleteWorkout(Workouts workout);
    
    String deleteWorkout(int id);
    
    Workouts getWorkoutById(int id);
    
    List<Workouts> getAllWorkouts();
    
    List<Workouts> getWorkoutsByUserId(int userid);
}
