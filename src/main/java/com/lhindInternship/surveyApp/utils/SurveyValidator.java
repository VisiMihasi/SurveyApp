package com.lhindInternship.surveyApp.utils;

import com.lhindInternship.surveyApp.models.Survey;

public class SurveyValidator {
    public static boolean validateSurvey(Survey survey) {
        if (survey.getQuestions().size() < 10 || survey.getQuestions().size() > 40) {
            return false;
        }
        return true;
    }
}
