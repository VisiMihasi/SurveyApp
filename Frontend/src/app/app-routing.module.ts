import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AddSurveyComponent } from './pages/add_survey/add-survey.component';
import { EditSurveyComponent } from './pages/edit_survey/edit-survey.component';
import { SurveyTableComponent } from './pages/survey_table/survey-table.component';
import { TakeSurveyComponent } from './pages/take_survey/take-survey.component';
import {FillSurveyComponent} from './pages/take_survey/fill-survey.component';

// Export the routes array
export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'add-survey', component: AddSurveyComponent },
  { path: 'edit-survey', component: EditSurveyComponent },
  { path: 'survey-table', component: SurveyTableComponent },
  { path: 'take-survey', component: TakeSurveyComponent },
  { path: 'fill-survey/:id', component: FillSurveyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
