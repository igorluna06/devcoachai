package com.devcoachai.javaapi.domain.entities;

import com.devcoachai.javaapi.domain.enums.Language;
import com.devcoachai.javaapi.domain.enums.Level;
import jakarta.persistence.*;

@Entity
@Table(name = "\"StudyPlan\"")
public class StudyPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "title")
    private String title;
    @Column(name = "level")
    @Enumerated(EnumType.STRING)
    private Level level;
    @Column(name = "language")
    @Enumerated(EnumType.STRING)
    private Language language;
    @Column(name = "isActive")
    private boolean isActive;
    @Column(name = "userId")
    private Integer userId;

    public StudyPlan(){}

    public Integer getId() {return id;}
    public String getTitle() {return title;}
    public Level getLevel() {return level;}
    public Language getLanguage() {return language;}
    public boolean isActive() {return isActive;}
    public Integer getUserId() {return userId;}
}
