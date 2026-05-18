package com.devcoachai.javaapi.domain.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "\"StudySession\"")
public class StudySession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDateTime dateSession;
    private Integer minutesStudied;
    private Integer tasksCompleted;
    private Integer userId;

    public StudySession(){}

    public Integer getId() {return id;}
    public LocalDateTime getDateSession() {return dateSession;}
    public Integer getMinutesStudied() {return minutesStudied;}
    public Integer getTasksCompleted() {return tasksCompleted;}
    public Integer getUserId() {return userId;}
}
