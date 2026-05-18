package com.devcoachai.javaapi.domain.repositories;

import com.devcoachai.javaapi.domain.entities.StudySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudySessionRepository extends JpaRepository<StudySession, Integer> {
    List<StudySession> findByUserId(Integer userId);
}
