import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router, ActivatedRoute } from '@angular/router'; // Add ActivatedRoute
import { Quiz, Question } from '../../models/quiz.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent {
  quiz: Quiz = { id: '', title: '', questions: [] };
  @ViewChildren('optionInput') optionInputs!: QueryList<ElementRef>;
  validationErrors: { [key: string]: string[] } = {};
  isEditing: boolean = false; // Track if we're editing

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute // Add route to get quiz ID
  ) {}

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      const existingQuiz = this.quizService.getQuizById(quizId);
      if (existingQuiz) {
        this.quiz = { ...existingQuiz }; // Deep copy to avoid modifying original
        this.isEditing = true;
      } else {
        this.router.navigate(['/quizzes']); // Redirect if quiz not found
      }
    }
  }

  addQuestion() {
    this.quiz.questions.push({ text: '', options: ['', '', '', ''], correctAnswers: [] });
  }

  removeQuestion(index: number) {
    this.quiz.questions.splice(index, 1);
    this.clearQuestionErrors(index);
  }

  toggleCorrectAnswer(questionIndex: number, optionIndex: number) {
    const correctAnswers = this.quiz.questions[questionIndex].correctAnswers;
    const idx = correctAnswers.indexOf(optionIndex);
    if (idx > -1) {
      correctAnswers.splice(idx, 1);
    } else {
      if (correctAnswers.length > 0) {
        correctAnswers.length = 0;
      }
      correctAnswers.push(optionIndex);
    }
  }

  saveQuiz() {
    if (this.validateQuiz()) {
      if (this.isEditing) {
        this.quizService.updateQuiz(this.quiz); // Assume updateQuiz exists in QuizService
      } else {
        this.quizService.saveQuiz(this.quiz);
      }
      this.router.navigate(['/quizzes']);
    }
  }

  validateQuiz(): boolean {
    this.validationErrors = {};

    if (!this.quiz.title.trim()) {
      this.validationErrors['title'] = ['Quiz title is required.'];
    }

    if (this.quiz.questions.length === 0) {
      this.validationErrors['questions'] = ['At least one question is required.'];
    }

    this.quiz.questions.forEach((question, index) => {
      const questionKey = `question_${index}`;
      this.validationErrors[questionKey] = [];

      if (!question.text.trim()) {
        this.validationErrors[questionKey].push('Question text is required.');
      }

      question.options.forEach((option, optIndex) => {
        if (!option.trim()) {
          this.validationErrors[questionKey].push(`Option ${optIndex + 1} is required.`);
        }
      });

      if (question.correctAnswers.length === 0) {
        this.validationErrors[questionKey].push('At least one correct answer must be selected.');
      } else if (question.correctAnswers.length > 1) {
        this.validationErrors[questionKey].push('Only one correct answer can be selected.');
      }

      if (this.validationErrors[questionKey].length === 0) {
        delete this.validationErrors[questionKey];
      }
    });

    return Object.keys(this.validationErrors).length === 0;
  }

  clearQuestionErrors(index: number) {
    const questionKey = `question_${index}`;
    delete this.validationErrors[questionKey];
    for (let i = index + 1; i < this.quiz.questions.length + 1; i++) {
      const oldKey = `question_${i}`;
      const newKey = `question_${i - 1}`;
      if (this.validationErrors[oldKey]) {
        this.validationErrors[newKey] = this.validationErrors[oldKey];
        delete this.validationErrors[oldKey];
      }
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

  hasErrors(field: string): boolean {
    return !!this.validationErrors[field]?.length;
  }
}