package com.devcoachai.javaapi.domain.repositories;

import com.devcoachai.javaapi.domain.entities.StudyPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudyPlanRepository extends JpaRepository<StudyPlan, Integer> {
    List<StudyPlan> findByUserId(Integer userId);
}
