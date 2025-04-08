import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz, Question } from '../../models/quiz.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-player',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-player.component.html',
  styleUrls: ['./quiz-player.component.scss']
})
export class QuizPlayerComponent implements OnInit {
  quiz: Quiz | undefined;
  currentIndex = 0;
  userAnswers: number[][] = [];

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quiz = this.quizService.getQuizById(id!);
    if (!this.quiz) {
      this.router.navigate(['/quizzes']);
      return;
    }
    this.userAnswers = this.quiz.questions.map(() => []);
    console.log('Quiz loaded:', this.quiz); // Debug log to verify quiz data
  }

  get currentQuestion(): Question | undefined {
    return this.quiz?.questions[this.currentIndex];
  }

  toggleUserAnswer(optionIndex: number) {
    const answers = this.userAnswers[this.currentIndex];
    const idx = answers.indexOf(optionIndex);
    if (idx > -1) {
      answers.splice(idx, 1);
    } else {
      answers.push(optionIndex);
    }
  }

  nextQuestion() {
    if (this.currentIndex < (this.quiz?.questions.length || 0) - 1) {
      this.currentIndex++;
    }
  }

  finishQuiz() {
    this.router.navigate(['/result'], { state: { quiz: this.quiz, answers: this.userAnswers } });
  }

  previousQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Explicit progress calculation
  getProgressPercentage(): number {
    if (!this.quiz || this.quiz.questions.length === 0) return 0;
    return ((this.currentIndex + 1) / this.quiz.questions.length) * 100;
  }
}