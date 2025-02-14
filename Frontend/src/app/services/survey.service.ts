import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'http://localhost:8080/api/surveys';

  constructor(private http: HttpClient) {}

  createSurvey(survey: any): Observable<any> {
    return this.http.post(this.apiUrl, survey);
  }

  getSurveys(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSurveyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  updateSurvey(id: number, surveyData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, surveyData);
  }

  submitSurvey(id: string, responses: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/submit`, responses);
  }
}
