package com.devcoachai.javaapi.domain.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

@Entity
@Table(name = "Module")
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "title")
    private String title;
    @Column(name = "isCompleted")
    private boolean isCompleted;
    @Column(name = "order")
    private Integer order;
    @Column(name = "studyPlanId")
    private Integer studyPlanId;
    @Column(name = "isLocked")
    private boolean isLocked;


    public Module(){}

    public Integer getId() {return id;}
    public String getTitle() {return title;}
    public boolean isCompleted() {return isCompleted;}
    public Integer getOrder() {return order;}
    public Integer getStudyPlanId() {return studyPlanId;}
    public boolean isLocked() { return isLocked; }
}
