package com.devcoachai.javaapi.domain.entities;

import com.devcoachai.javaapi.domain.enums.DifficultyRating;
import com.devcoachai.javaapi.domain.enums.TaskType;
import jakarta.persistence.*;

@Entity
@Table(name = "\"Task\"")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @Enumerated(EnumType.STRING)
    private TaskType type;

    private boolean isCompleted;

    @Enumerated(EnumType.STRING)
    private DifficultyRating difficultyRating;

    private Integer moduleId;

    public Task(){}

    public Integer getId() {return id;}
    public String getTitle() {return title;}
    public TaskType getType() {return type;}
    public boolean isCompleted() {return isCompleted;}
    public DifficultyRating getDifficultyRating() {return difficultyRating;}
    public Integer getModuleId() {return moduleId;}
}
