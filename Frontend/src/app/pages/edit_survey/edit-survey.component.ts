import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>📋 Edit Survey</h2>

      <ul class="survey-list">
        <li *ngFor="let survey of surveys" (click)="openEditModal(survey)">
          {{ survey.title }} - {{ survey.description }}
        </li>
      </ul>

      <div *ngIf="editingSurvey" class="modal">
        <div class="modal-content">
          <span class="close" (click)="closeModal()">&times;</span>
          <h3>📝 Edit Survey</h3>

          <form [formGroup]="surveyForm" (ngSubmit)="onSubmit()">
            <!-- Survey Title -->
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
            <button type="submit" class="submit-btn">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 700px;
      margin: 20px auto;
      padding: 20px;
      border-radius: 12px;
      background: linear-gradient(135deg, #f8f9fa, #e9ecef);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    h2 {
      text-align: center;
      color: #333;
    }

    .survey-list {
      list-style: none;
      padding: 0;
      margin-bottom: 20px;
    }
    .survey-list li {
      background: #007bff;
      color: white;
      padding: 10px;
      margin-bottom: 5px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .survey-list li:hover {
      background: #0056b3;
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
      padding: 10px;
      border-radius: 6px;
      border: 1px solid #ced4da;
      box-sizing: border-box;
    }
    textarea {
      height: 80px;
    }

    .question-group {
      background: #fff;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 6px;
      border: 1px solid #ddd;
    }

    .add-btn, .submit-btn {
      width: 100%;
      padding: 10px;
      border: none;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .add-btn {
      background: #28a745;
      color: white;
    }
    .add-btn:hover {
      background: #218838;
    }
    .submit-btn {
      background: #007BFF;
      color: white;
      margin-top: 10px;
    }
    .submit-btn:hover {
      background: #0056b3;
    }
    .remove-btn {
      background: #dc3545;
      color: white;
      border: none;
      padding: 8px;
      margin-top: 8px;
      border-radius: 6px;
      cursor: pointer;
    }
    .remove-btn:hover {
      background: #bd2130;
    }

    .modal {
      display: flex;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 10px;
      width: 50%;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }

    .close {
      float: right;
      font-size: 1.5em;
      cursor: pointer;
      color: red;
    }
    .close:hover {
      color: darkred;
    }
  `]
})
export class EditSurveyComponent implements OnInit {
  surveys: any[] = [];
  editingSurvey: any = null;
  surveyForm!: FormGroup;

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  // Load surveys from the backend
  loadSurveys(): void {
    this.surveyService.getSurveys().subscribe(data => {
      this.surveys = data;
    });
  }

  openEditModal(survey: any): void {
    this.editingSurvey = survey;

    this.surveyForm = new FormGroup({
      title: new FormControl(survey.title, Validators.required),
      description: new FormControl(survey.description, Validators.required),
      questions: new FormArray(survey.questions.map((q: any) => new FormGroup({
        text: new FormControl(q.text, Validators.required),
        agree: new FormControl(q.agree), // ✅ Preserve AGREE count
        slightlyAgree: new FormControl(q.slightlyAgree), // ✅ Preserve SLIGHTLY_AGREE count
        slightlyDisagree: new FormControl(q.slightlyDisagree), // ✅ Preserve SLIGHTLY_DISAGREE count
        disagree: new FormControl(q.disagree) // ✅ Preserve DISAGREE count
      })))
    });
  }


  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    this.questions.push(new FormGroup({
      text: new FormControl('', Validators.required),
      agree: new FormControl(0),
      slightlyAgree: new FormControl(0),
      slightlyDisagree: new FormControl(0),
      disagree: new FormControl(0)
    }));
  }


  removeQuestion(index: number): void {
    this.questions.removeAt(index);

    if (this.editingSurvey?.questions) {
      this.editingSurvey.questions.splice(index, 1);
    }
  }


  closeModal(): void {
    this.editingSurvey = null;
    this.surveyForm.reset();
  }

  onSubmit(): void {
    if (this.surveyForm.valid) {
      const updatedSurvey = {
        ...this.surveyForm.value,
        id: this.editingSurvey.id,
        questions: this.surveyForm.value.questions.map((q: any, index: number) => ({
          text: q.text,
          agree: this.editingSurvey.questions[index]?.agree ?? 0, // ✅ Keep existing answer count
          slightlyAgree: this.editingSurvey.questions[index]?.slightlyAgree ?? 0,
          slightlyDisagree: this.editingSurvey.questions[index]?.slightlyDisagree ?? 0,
          disagree: this.editingSurvey.questions[index]?.disagree ?? 0
        }))
      };

      this.surveyService.updateSurvey(this.editingSurvey.id, updatedSurvey).subscribe({
        next: () => {
          alert('✅ Survey updated successfully!');
          this.closeModal();
          this.loadSurveys(); // Reload surveys after update
        },
        error: (err) => {
          console.error('❌ Error updating survey:', err);
          alert('Failed to update survey.');
        }
      });
    }
  }



}
