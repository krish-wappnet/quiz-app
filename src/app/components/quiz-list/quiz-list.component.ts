import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  // quizzes: Quiz[] = [];
  quizzes: (Quiz & { showQuestions?: boolean })[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.quizzes = this.quizService.getQuizzes();
  }

  deleteQuiz(quizId: string) {
    this.quizService.deleteQuiz(quizId); // Delegate to service
    this.quizzes = this.quizService.getQuizzes(); // Refresh local array
  }
}