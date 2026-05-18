package com.devcoachai.javaapi.domain.repositories;

import com.devcoachai.javaapi.domain.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByModuleId(Integer moduleId);
}
