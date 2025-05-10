package com.fitme.backend.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name="meals")
public class Meals {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int mid;
	 @ManyToOne
	 @JoinColumn(name = "userid", nullable = false)
	 private Users user;

	@Column(name="meal name", nullable=false, length=50)
	private String mealName;
	@Column(name="calories", nullable=false, length=20)
	private int calories;
	@Column(name="protiens", nullable=false, length=20)
	private String protiens;
	@Column(name="carbs", nullable=false, length=20)
	private String carbs;
	@Column(name="fats", nullable=false, length=20)
	private String fats;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;
	
	public Meals(){
		this.mid=0;
		this.mealName=null;
		this.calories=0;
		this.protiens=null;
		this.carbs=null;
		this.fats=null;
	}

	public Meals(Users user, String mealName, int calories, String protiens, String carbs, String fats) {
		super();
		this.user = user;
		this.mealName = mealName;
		this.calories = calories;
		this.protiens = protiens;
		this.carbs = carbs;
		this.fats = fats;
	}
	@PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
    }

	public int getMid() {
		return mid;
	}

	public void setMid(int mid) {
		this.mid = mid;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public String getMealName() {
		return mealName;
	}

	public void setMealName(String mealName) {
		this.mealName = mealName;
	}

	public int getCalories() {
		return calories;
	}

	public void setCalories(int calories) {
		this.calories = calories;
	}

	public String getProtiens() {
		return protiens;
	}

	public void setProtiens(String protiens) {
		this.protiens = protiens;
	}

	public String getCarbs() {
		return carbs;
	}

	public void setCarbs(String carbs) {
		this.carbs = carbs;
	}

	public String getFats() {
		return fats;
	}

	public void setFats(String fats) {
		this.fats = fats;
	}

	@Override
	public String toString() {
		return "Meals [mid=" + mid + ", user=" + user + ", mealName=" + mealName + ", calories=" + calories
				+ ", protiens=" + protiens + ", carbs=" + carbs + ", fats=" + fats + "]";
	}
	

}
