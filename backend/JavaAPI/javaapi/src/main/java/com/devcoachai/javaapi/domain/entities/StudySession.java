package com.devcoachai.javaapi.domain.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "\"StudySession\"")
public class StudySession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "date")
    private LocalDateTime dateSession;
    @Column(name = "minutesStudied")
    private Integer minutesStudied;
    @Column(name = "tasksCompleted")
    private Integer tasksCompleted;
    @Column(name = "userId")
    private Integer userId;

    public StudySession(){}

    public Integer getId() {return id;}
    public LocalDateTime getDateSession() {return dateSession;}
    public Integer getMinutesStudied() {return minutesStudied;}
    public Integer getTasksCompleted() {return tasksCompleted;}
    public Integer getUserId() {return userId;}
}
