package com.lhindInternship.surveyApp.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Map;
import java.util.HashMap;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id")
    @JsonBackReference
    private Survey survey;

    @Column(columnDefinition = "int default 0")
    private int agree;

    @Column(columnDefinition = "int default 0")
    private int slightlyAgree;

    @Column(columnDefinition = "int default 0")
    private int slightlyDisagree;

    @Column(columnDefinition = "int default 0")
    private int disagree;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "answer_counts", joinColumns = @JoinColumn(name = "question_id"))
    @MapKeyEnumerated(EnumType.STRING)
    @MapKeyColumn(name = "answer_option")
    @Column(name = "count")
    private Map<AnswerOption, Integer> options = new HashMap<>();

    public Question() {}

    public int getAgree() {
        return agree;
    }

    public void setAgree(int agree) {
        this.agree = agree;
    }

    public int getSlightlyAgree() {
        return slightlyAgree;
    }

    public void setSlightlyAgree(int slightlyAgree) {
        this.slightlyAgree = slightlyAgree;
    }

    public int getSlightlyDisagree() {
        return slightlyDisagree;
    }

    public void setSlightlyDisagree(int slightlyDisagree) {
        this.slightlyDisagree = slightlyDisagree;
    }

    public int getDisagree() {
        return disagree;
    }

    public void setDisagree(int disagree) {
        this.disagree = disagree;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public Map<AnswerOption, Integer> getOptions() {
        return options;
    }

    public void setOptions(Map<AnswerOption, Integer> options) {
        this.options = options;
    }
}
