import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Quiz, Question } from '../../models/quiz.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-result',
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'] // Add SCSS file reference
})
export class QuizResultComponent implements OnInit {
  quiz: Quiz;
  userAnswers: number[][] = [];
  score = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.quiz = navigation?.extras.state?.['quiz'];
    this.userAnswers = navigation?.extras.state?.['answers'] || [];
  }

  ngOnInit() {
    if (!this.quiz) this.router.navigate(['/quizzes']);
    this.calculateScore();
  }

  calculateScore() {
    this.quiz.questions.forEach((q, i) => {
      const userAns = this.userAnswers[i].sort();
      const correctAns = q.correctAnswers.sort();
      if (JSON.stringify(userAns) === JSON.stringify(correctAns)) {
        this.score++;
      }
    });
  }

  getUserAnswersText(question: Question, index: number): string {
    const userAns = this.userAnswers[index];
    return userAns.length ? userAns.map(idx => question.options[idx]).join(', ') : 'None';
  }

  getCorrectAnswersText(question: Question): string {
    return question.correctAnswers.map(idx => question.options[idx]).join(', ');
  }

  // Helper method to check if the answer was correct
  isCorrect(index: number): boolean {
    const userAns = this.userAnswers[index].sort();
    const correctAns = this.quiz.questions[index].correctAnswers.sort();
    return JSON.stringify(userAns) === JSON.stringify(correctAns);
  }

  restart() {
    this.router.navigate(['/quiz', this.quiz.id]);
  }
}