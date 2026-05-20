package com.devcoachai.javaapi.domain.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "\"User\"")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "streak")
    private Integer streak;
    @Column(name = "lastStudiedAt")
    private LocalDateTime lastStudiedAt;

    public User(){}

    public Integer getId() {return id;}
    public String getName() {return name;}
    public String getEmail() {return email;}
    public Integer getStreak() {return streak;}
    public LocalDateTime getLastStudiedAt() {return lastStudiedAt;}
}
