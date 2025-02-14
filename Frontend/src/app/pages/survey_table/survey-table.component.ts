import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-survey-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Survey Table</h2>
    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Survey Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let survey of surveys">
          <td>{{ survey.id }}</td>
          <td>{{ survey.name }}</td>
          <td>
            <button [routerLink]="['/edit-survey', survey.id]">Edit</button>
            <button [routerLink]="['/take-survey', survey.id]">Take</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class SurveyTableComponent implements OnInit {
  // Example static data
  surveys = [
    { id: 1, name: 'Customer Satisfaction Survey' },
    { id: 2, name: 'Employee Engagement Survey' }
  ];

  ngOnInit(): void {
  }
}
