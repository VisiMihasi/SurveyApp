package com.lhindInternship.surveyApp.services;

import com.lhindInternship.surveyApp.models.Candidate;
import java.util.HashSet;
import java.util.Set;

public class CandidateService {
    private Set<Candidate> candidates = new HashSet<>();

    public void registerCandidate(Candidate candidate) {
        candidates.add(candidate);
    }

    public void updateCandidateInfo(Candidate candidate) {
    }


}
