package com.lhindInternship.surveyApp.services;

import com.lhindInternship.surveyApp.dto.SurveyResponseDTO;
import com.lhindInternship.surveyApp.models.Question;
import com.lhindInternship.surveyApp.models.Survey;
import com.lhindInternship.surveyApp.repository.QuestionRepository;
import com.lhindInternship.surveyApp.repository.SurveyRepository;
import com.lhindInternship.surveyApp.utils.SurveyValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class SurveyService {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Transactional
    public Survey saveSurvey(Survey survey) {
        try {
            if (!SurveyValidator.validateSurvey(survey)) {
                throw new IllegalArgumentException("Survey must have between 10 and 40 questions.");
            }

            for (Question question : survey.getQuestions()) {
                question.setSurvey(survey);
            }

            return surveyRepository.save(survey);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("An unexpected error occurred while saving the survey.");
        }
    }

    public List<Survey> getAllSurveys() {
        return surveyRepository.findAll();
    }

    public Optional<Survey> getSurveyById(Long id) {
        return surveyRepository.findById(id);
    }

    @Transactional
    public Survey updateSurvey(Long id, Survey updatedSurvey) {
        try {
            return surveyRepository.findById(id).map(existingSurvey -> {

                if (!SurveyValidator.validateSurvey(updatedSurvey)) {
                    throw new IllegalArgumentException("Survey must have between 10 and 40 questions.");
                }

                existingSurvey.setTitle(updatedSurvey.getTitle());
                existingSurvey.setDescription(updatedSurvey.getDescription());

                existingSurvey.getQuestions().clear();
                for (Question question : updatedSurvey.getQuestions()) {
                    question.setSurvey(existingSurvey);
                    existingSurvey.getQuestions().add(question);
                }

                return surveyRepository.save(existingSurvey);
            }).orElseThrow(() -> new RuntimeException("Survey not found"));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("An unexpected error occurred while updating the survey.");
        }
    }

    @Transactional
    public void submitSurveyResponse(Long surveyId, List<SurveyResponseDTO> responses) {
        try {
            for (SurveyResponseDTO response : responses) {
                Question question = questionRepository.findById(response.getQuestionId())
                        .orElseThrow(() -> new RuntimeException("Question not found"));

                switch (response.getAnswerOption()) {
                    case "AGREE":
                        question.setAgree(question.getAgree() + 1);
                        break;
                    case "SLIGHTLY_AGREE":
                        question.setSlightlyAgree(question.getSlightlyAgree() + 1);
                        break;
                    case "SLIGHTLY_DISAGREE":
                        question.setSlightlyDisagree(question.getSlightlyDisagree() + 1);
                        break;
                    case "DISAGREE":
                        question.setDisagree(question.getDisagree() + 1);
                        break;
                }

                questionRepository.save(question);
            }
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while submitting the survey responses.");
        }
    }
}
