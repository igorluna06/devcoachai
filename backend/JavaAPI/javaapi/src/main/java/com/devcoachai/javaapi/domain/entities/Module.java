package com.devcoachai.javaapi.domain.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

@Entity
@Table(name = "\"Module\"")
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private boolean isCompleted;
    private Integer order;
    private Integer studyPlanId;

    public Module(){}

    public Integer getId() {return id;}
    public String getTitle() {return title;}
    public boolean isCompleted() {return isCompleted;}
    public Integer getOrder() {return order;}
    public Integer getStudyPlanId() {return studyPlanId;}
}
