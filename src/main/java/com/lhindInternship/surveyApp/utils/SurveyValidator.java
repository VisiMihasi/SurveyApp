package com.lhindInternship.surveyApp.utils;

import com.lhindInternship.surveyApp.models.Survey;
import org.apache.commons.lang3.StringUtils;

public class SurveyValidator {

    /**
     Validates the number of questions in the survey.
     */
    public static boolean validateSurvey(Survey survey) {
        return survey.getQuestions().size() >= 10 && survey.getQuestions().size() <= 40;
    }

    /**
     * Validates title, description, and each question in the survey.
     * Throws an IllegalArgumentException if validation fails.
     */
    public static void validateSurveyFields(Survey survey) {
        if (StringUtils.isBlank(survey.getTitle())) {
            throw new IllegalArgumentException("Survey title cannot be empty or blank.");
        }
        if (StringUtils.isBlank(survey.getDescription())) {
            throw new IllegalArgumentException("Survey description cannot be empty or blank.");
        }
        survey.getQuestions().forEach(question -> {
            if (StringUtils.isBlank(question.getText())) {
                throw new IllegalArgumentException("Survey questions cannot be empty or blank.");
            }
        });
    }
}
