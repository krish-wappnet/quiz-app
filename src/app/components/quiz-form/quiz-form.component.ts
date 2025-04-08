import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';
import { Quiz, Question } from '../../models/quiz.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss'] // Add SCSS file reference
})
export class QuizFormComponent {
  quiz: Quiz = { id: '', title: '', questions: [] };
  @ViewChildren('optionInput') optionInputs!: QueryList<ElementRef>;

  constructor(private quizService: QuizService, private router: Router) {}

  addQuestion() {
    this.quiz.questions.push({ text: '', options: ['', '', '', ''], correctAnswers: [] });
  }

  removeQuestion(index: number) {
    this.quiz.questions.splice(index, 1);
  }

  toggleCorrectAnswer(questionIndex: number, optionIndex: number) {
    const correctAnswers = this.quiz.questions[questionIndex].correctAnswers;
    const idx = correctAnswers.indexOf(optionIndex);
    if (idx > -1) {
      correctAnswers.splice(idx, 1);
    } else {
      correctAnswers.push(optionIndex);
    }
  }

  saveQuiz() {
    if (this.quiz.title && this.quiz.questions.length > 0) {
      this.quizService.saveQuiz(this.quiz);
      this.router.navigate(['/quizzes']);
    }
  }

  trackByOption(index: number, option: string): number {
    return index;
  }

  onInput(event: Event, questionIndex: number, optionIndex: number) {
    const input = this.optionInputs.toArray()[questionIndex * 4 + optionIndex]?.nativeElement;
    if (input) {
      input.focus();
    }
  }
}