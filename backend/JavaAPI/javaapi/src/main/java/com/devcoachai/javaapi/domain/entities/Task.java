package com.devcoachai.javaapi.domain.entities;

import com.devcoachai.javaapi.domain.enums.DifficultyRating;
import com.devcoachai.javaapi.domain.enums.TaskType;
import jakarta.persistence.*;

@Entity
@Table(name = "\"Task\"")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "title")
    private String title;
    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private TaskType type;
    @Column(name = "isCompleted")
    private boolean isCompleted;
    @Column(name = "difficultyRating")
    @Enumerated(EnumType.STRING)
    private DifficultyRating difficultyRating;
    @Column(name = "moduleId")
    private Integer moduleId;

    public Task(){}

    public Integer getId() {return id;}
    public String getTitle() {return title;}
    public TaskType getType() {return type;}
    public boolean isCompleted() {return isCompleted;}
    public DifficultyRating getDifficultyRating() {return difficultyRating;}
    public Integer getModuleId() {return moduleId;}
}
