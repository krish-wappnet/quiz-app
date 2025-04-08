import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizzesKey = 'quizzes';

  getQuizzes(): Quiz[] {
    return JSON.parse(localStorage.getItem(this.quizzesKey) || '[]');
  }

  saveQuiz(quiz: Quiz): void {
    const quizzes = this.getQuizzes();
    quiz.id = Date.now().toString(); // Simple unique ID
    quizzes.push(quiz);
    localStorage.setItem(this.quizzesKey, JSON.stringify(quizzes));
  }

  getQuizById(id: string): Quiz | undefined {
    return this.getQuizzes().find(q => q.id === id);
  }
}