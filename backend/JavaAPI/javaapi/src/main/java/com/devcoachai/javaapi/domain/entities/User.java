package com.devcoachai.javaapi.domain.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "\"User\"")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String email;
    private Integer streak;
    private LocalDateTime lastStudiedAt;

    public User(){}

    public Integer getId() {return id;}
    public String getName() {return name;}
    public String getEmail() {return email;}
    public Integer getStreak() {return streak;}
    public LocalDateTime getLastStudiedAt() {return lastStudiedAt;}
}
