import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-add-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Add a New Survey</h2>

      <div *ngIf="errorMessage" class="error-box">
        ⚠️ {{ errorMessage }}
      </div>

      <form [formGroup]="surveyForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Survey Title:</label>
          <input type="text" formControlName="title" placeholder="Enter survey title" />
        </div>

        <div class="form-group">
          <label>Survey Description:</label>
          <textarea formControlName="description" placeholder="Enter survey description"></textarea>
        </div>

        <div formArrayName="questions">
          <div *ngFor="let question of questions.controls; let i = index" [formGroupName]="i" class="question-group">
            <label>Question {{ i + 1 }}:</label>
            <input type="text" formControlName="text" placeholder="Enter question" />
            <button type="button" (click)="removeQuestion(i)" class="remove-btn">Remove</button>
          </div>
        </div>

        <button type="button" (click)="addQuestion()" class="add-btn">Add Question</button>
        <br />

        <button type="submit" class="submit-btn" [disabled]="loading">
          <ng-container *ngIf="!loading">Submit Survey</ng-container>
          <ng-container *ngIf="loading">
            <div class="spinner"></div> Submitting...
          </ng-container>
        </button>
      </form>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .error-box {
        background: #ffdddd;
        color: #d8000c;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #d8000c;
        margin-bottom: 10px;
        text-align: center;
      }
      .form-group {
        margin-bottom: 15px;
      }
      label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
      }
      input, textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
      }
      .question-group {
        margin-bottom: 10px;
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 5px;
        background-color: #fff;
      }
      .add-btn, .submit-btn {
        margin-top: 10px;
        padding: 8px 12px;
        border: none;
        background-color: #28a745;
        color: white;
        border-radius: 4px;
        cursor: pointer;
      }
      .submit-btn {
        background-color: #007BFF;
      }
      .submit-btn[disabled] {
        background-color: #aaa;
        cursor: not-allowed;
      }
      .remove-btn {
        margin-top: 10px;
        padding: 8px 12px;
        border: none;
        background-color: #dc3545;
        color: white;
        border-radius: 4px;
        cursor: pointer;
      }
      .spinner {
        width: 16px;
        height: 16px;
        margin-right: 8px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        display: inline-block;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
  ]
})
export class AddSurveyComponent {
  surveyForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    questions: new FormArray([])
  });

  loading = false;
  errorMessage: string | null = null;

  constructor(private surveyService: SurveyService, private router: Router) {}

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    const questionGroup = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.questions.push(questionGroup);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  onSubmit(): void {
    console.log('🚀 Submit button clicked!');

    if (this.surveyForm.valid) {
      console.log('✅ Form is valid:', JSON.stringify(this.surveyForm.value, null, 2));

      this.loading = true;
      this.errorMessage = null;

      this.surveyService.createSurvey(this.surveyForm.value).subscribe({
        next: (response) => {
          console.log('🎉 Survey saved successfully!', response);
          alert('Survey created successfully!');

          this.surveyForm.reset();
          this.loading = false;

          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('❌ Error saving survey:', error);
          this.errorMessage = error.error;
          this.loading = false;
        }
      });
    } else {
      console.warn('⚠️ Form is invalid!', this.surveyForm.errors);
    }
  }
}
