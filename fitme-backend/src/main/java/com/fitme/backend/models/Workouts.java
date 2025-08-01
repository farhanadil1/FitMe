package com.fitme.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "workouts")
public class Workouts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int wid;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    private Users user;

    @Column(name = "date", nullable = false, length = 20)
    private String date;

    @Column(name = "exercise", nullable = false, length = 100)
    private String exercise;

    @Column(name = "sets", length = 10)
    private String sets;

    @Column(name = "reps", length = 10)
    private String reps;

    @Column(name = "weight", length = 10)
    private String weight;

    @Column(name = "notes", length = 255)
    private String notes;

    public Workouts() {
        this.date = null;
        this.exercise = null;
        this.sets = null;
        this.reps = null;
        this.weight = null;
        this.notes = null;
    }

    public Workouts(Users user, String date, String exercise, String sets, String reps, String weight, String notes) {
        this.user = user;
        this.date = date;
        this.exercise = exercise;
        this.sets = sets;
        this.reps = reps;
        this.weight = weight;
        this.notes = notes;
    }

    public int getId() {
        return wid;
    }

    public void setId(int wid) {
        this.wid = wid;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getExercise() {
        return exercise;
    }

    public void setExercise(String exercise) {
        this.exercise = exercise;
    }

    public String getSets() {
        return sets;
    }

    public void setSets(String sets) {
        this.sets = sets;
    }

    public String getReps() {
        return reps;
    }

    public void setReps(String reps) {
        this.reps = reps;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "Workout [id=" + wid + ", user=" + user.getUserid() + ", date=" + date +
                ", exercise=" + exercise + ", sets=" + sets + ", reps=" + reps +
                ", weight=" + weight + ", notes=" + notes + "]";
    }
}
