import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz, Question } from '../../models/quiz.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-player',
  imports:[CommonModule, FormsModule],
  templateUrl: './quiz-player.component.html'
})
export class QuizPlayerComponent implements OnInit {
  quiz: Quiz | undefined;
  currentIndex = 0;
  userAnswers: number[][] = []; // Array of arrays for multiple selections

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quiz = this.quizService.getQuizById(id!);
    if (!this.quiz) this.router.navigate(['/quizzes']);
    this.userAnswers = this.quiz?.questions.map(() => []) || [];
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
}