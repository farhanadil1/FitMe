import axios from 'axios';

const API_URL = "http://localhost:8053/api/workout";

// Get all workouts
export const getWorkouts = () => axios.get(`${API_URL}/`);

// Get a specific workout by ID
export const getWorkoutId = (id) => axios.get(`${API_URL}/${id}`);

// Create a new workout
export const createWorkout = (workout) => axios.post(`${API_URL}/create`, workout);

// Update an existing workout
export const updateWorkout = (workout) => axios.put(`${API_URL}/edit`, workout);

// Delete a workout by ID
export const deleteWorkout = (id) => axios.delete(`${API_URL}/delete/${id}`);

// Get all workouts by a specific user ID
export const getWorkoutByUserId = (userId) => axios.get(`${API_URL}/user/${userId}`);
