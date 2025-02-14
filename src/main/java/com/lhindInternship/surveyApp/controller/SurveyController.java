package com.lhindInternship.surveyApp.controller;

import com.lhindInternship.surveyApp.dto.SurveyResponseDTO;
import com.lhindInternship.surveyApp.models.Survey;
import com.lhindInternship.surveyApp.services.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/surveys")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @PostMapping
    public ResponseEntity<Survey> createSurvey(@RequestBody Survey survey) {
        Survey savedSurvey = surveyService.saveSurvey(survey);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSurvey);
    }

    @GetMapping
    public List<Survey> getAllSurveys() {
        return surveyService.getAllSurveys();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Survey> getSurveyById(@PathVariable Long id) {
        return surveyService.getSurveyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Survey> updateSurvey(@PathVariable Long id, @RequestBody Survey updatedSurvey) {
        Survey savedSurvey = surveyService.updateSurvey(id, updatedSurvey);
        return ResponseEntity.ok(savedSurvey);
    }

    @PutMapping("/{id}/submit")
    public ResponseEntity<Map<String, String>> submitSurvey(
            @PathVariable Long id, @RequestBody List<SurveyResponseDTO> responses) {
        surveyService.submitSurveyResponse(id, responses);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Survey responses submitted successfully!");

        return ResponseEntity.ok(response);
    }
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleValidationException(IllegalArgumentException ex) {
        System.out.println("Validation error: " + ex.getMessage());
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<String> handleGeneralException(RuntimeException ex) {
        System.out.println("Error: " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
    }


}
