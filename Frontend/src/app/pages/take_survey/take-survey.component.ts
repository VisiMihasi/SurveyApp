import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SurveyService } from '../../services/survey.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-take-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Select a Survey to Take</h2>

      <ul class="survey-list">
        <li *ngFor="let survey of surveys" (click)="confirmTakeSurvey(survey.id)">
          <strong>{{ survey.title }}</strong> - {{ survey.description }}
        </li>
      </ul>

      <div *ngIf="selectedSurveyId !== null" class="modal">
        <div class="modal-content">
          <p>Are you sure you want to take this survey? It will take less than 10 minutes.</p>
          <button (click)="startSurvey()">Take Survey</button>
          <button class="cancel-btn" (click)="cancelSurvey()">Cancel</button>
        </div>
      </div>

      <div *ngIf="loading" class="spinner-container">
        <div class="spinner"></div>
        <p>Submitting survey...</p>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .survey-list {
        list-style: none;
        padding: 0;
      }
      .survey-list li {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin: 5px 0;
        cursor: pointer;
        background: white;
        transition: background 0.3s;
      }
      .survey-list li:hover {
        background: #007bff;
        color: white;
      }
      .modal {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
      }
      .modal-content {
        background: white;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
      }
      .cancel-btn {
        margin-left: 10px;
        background: red;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
      }
      .spinner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 0, 0, 0.2);
        border-top: 4px solid #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,
  ],
})
export class TakeSurveyComponent implements OnInit {
  surveys: any[] = [];
  selectedSurveyId: number | null = null;
  loading = false;

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit() {
    this.surveyService.getSurveys().subscribe((data) => {
      this.surveys = data;
    });
  }

  confirmTakeSurvey(surveyId: number) {
    this.selectedSurveyId = surveyId;
  }

  startSurvey() {
    if (this.selectedSurveyId !== null) {
      this.router.navigate(['/fill-survey', this.selectedSurveyId]);
    }
  }

  cancelSurvey() {
    this.selectedSurveyId = null;
  }
}
