import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Quiz, Question } from '../../models/quiz.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-result',
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {
  quiz: Quiz;
  userAnswers: (number | null)[] = []; // Updated type to match QuizPlayerComponent
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
      const userAns = this.userAnswers[i]; // Single number or null
      const correctAns = q.correctAnswers[0]; // Assuming first correct answer is the only one for single choice
      if (userAns !== null && userAns === correctAns) {
        this.score++;
      }
    });
  }

  getUserAnswersText(question: Question, index: number): string {
    const userAns = this.userAnswers[index];
    return userAns !== null ? question.options[userAns] : 'None';
  }

  getCorrectAnswersText(question: Question): string {
    return question.options[question.correctAnswers[0]]; // Single correct answer
  }

  isCorrect(index: number): boolean {
    const userAns = this.userAnswers[index];
    const correctAns = this.quiz.questions[index].correctAnswers[0];
    return userAns !== null && userAns === correctAns;
  }

  restart() {
    this.router.navigate(['/quiz', this.quiz.id]);
  }
}