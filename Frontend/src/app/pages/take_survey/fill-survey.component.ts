import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-fill-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>{{ surveyData?.title }}</h2>
      <p>{{ surveyData?.description }}</p>

      <form *ngIf="surveyForm" [formGroup]="surveyForm" (ngSubmit)="submitSurvey()">
        <div formArrayName="questions">
          <div *ngFor="let question of questions.controls; let i = index" [formGroupName]="i">
            <p>{{ surveyData.questions[i].text }}</p>
            <label *ngFor="let option of answerOptions">
              <input type="radio" [formControlName]="'answerOption'" [value]="option" />
              {{ option }}
            </label>
          </div>
        </div>

        <button type="submit" class="submit-btn" [disabled]="loading">
          <span *ngIf="!loading">Finish Survey</span>
          <span *ngIf="loading">
            <div class="spinner"></div> Submitting...
          </span>
        </button>
      </form>
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
      .submit-btn {
        background-color: #007BFF;
        color: white;
        padding: 10px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .submit-btn[disabled] {
        background-color: #aaa;
        cursor: not-allowed;
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
    `,
  ],
})
export class FillSurveyComponent implements OnInit {
  surveyId: string | null = null;
  surveyData: any;
  surveyForm!: FormGroup;
  answerOptions = ['AGREE', 'SLIGHTLY_AGREE', 'SLIGHTLY_DISAGREE', 'DISAGREE'];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.surveyId = this.route.snapshot.paramMap.get('id');
    if (this.surveyId) {
      this.surveyService.getSurveyById(+this.surveyId).subscribe((survey) => {
        this.surveyData = survey;
        this.createForm();
      });
    }
  }

  createForm() {
    this.surveyForm = this.fb.group({
      questions: this.fb.array(
        this.surveyData.questions.map(() => this.fb.group({ answerOption: [''] }))
      ),
    });
  }

  submitSurvey() {
    this.loading = true; // ✅ Show loading spinner
    const responses = this.surveyForm.value.questions.map((q: any, index: number) => ({
      questionId: this.surveyData.questions[index].id,
      answerOption: q.answerOption,
    }));

    this.surveyService.submitSurvey(this.surveyId!, responses).subscribe(
      (response) => {
        console.log('Survey submitted successfully', response);
        this.loading = false; // ✅ Hide loading spinner
        this.router.navigate(['/']); // ✅ Redirect to landing page
      },
      (error) => {
        console.error('Error submitting survey:', error);
        this.loading = false; // ✅ Ensure loading stops even on error
      }
    );
  }

  get questions() {
    return this.surveyForm.get('questions') as FormArray;
  }
}
