package com.lhindInternship.surveyApp.dto;

import com.lhindInternship.surveyApp.models.Question;
import com.lhindInternship.surveyApp.models.Survey;

import java.util.List;

public class SurveyDTO {
    private Long id;
    private String title;
    private String description;
    private List<String> questions;

    public SurveyDTO(Survey survey) {
        this.id = survey.getId();
        this.title = survey.getTitle();
        this.description = survey.getDescription();
        this.questions = survey.getQuestions().stream().map(Question::getText).toList();
    }

    // Getters
}
