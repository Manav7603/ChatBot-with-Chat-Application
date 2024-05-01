import { Component } from '@angular/core';
import { GeminiService } from './gemini.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private geminiService: GeminiService) {}

  async onSubmitQuestion(question: string) {
    // Call the Gemini service to get the response
    try {
      const response = await this.geminiService.getGeminiResponse(question).toPromise();
      console.log(response); // Log the response
      // Update chat history and display response
    } catch (error) {
      console.error('Error:', error); // Handle error
    }
  }
}
