package com.lhindInternship.surveyApp.repository;

import com.lhindInternship.surveyApp.models.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
}
