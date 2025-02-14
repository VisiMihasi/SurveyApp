package com.lhindInternship.surveyApp.dto;

public class SurveyResponseDTO {
    private Long questionId;
    private String answerOption;

    public SurveyResponseDTO() {}

    public SurveyResponseDTO(Long questionId, String answerOption) {
        this.questionId = questionId;
        this.answerOption = answerOption;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public String getAnswerOption() {
        return answerOption;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public void setAnswerOption(String answerOption) {
        this.answerOption = answerOption;
    }

    @Override
    public String toString() {
        return "SurveyResponseDTO{" +
                "questionId=" + questionId +
                ", answerOption='" + answerOption + '\'' +
                '}';
    }
}
