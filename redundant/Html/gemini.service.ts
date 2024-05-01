import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private readonly geminiUrl = 'https://api.gemini.com/v1/questions';
  private readonly apiKey = 'API _ KEY'; // Replace 'YOUR_API_KEY_HERE' with your actual API key

  constructor(private http: HttpClient) { }

  // Function to send question and receive response from Gemini
  getGeminiResponse(question: string): Observable<string> {
    // Define the request body
    const requestBody = { question: question };

    // Make the HTTP POST request to Gemini API with API key in headers
    return this.http.post<string>(this.geminiUrl, requestBody, { headers: { 'X-API-Key': this.apiKey } });
  }
}
