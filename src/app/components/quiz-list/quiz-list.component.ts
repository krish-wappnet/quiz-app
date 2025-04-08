import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeleteConfirmationModalComponent } from '../../modals/delete-confirmation-modal.component';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DeleteConfirmationModalComponent],
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  quizzes: (Quiz & { showQuestions?: boolean })[] = [];
  showDeleteModal: boolean = false;
  quizToDelete: string | null = null;
  quizTitleToDelete: string = '';

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.loadQuizzes();
  }

  private loadQuizzes() {
    this.quizzes = this.quizService.getQuizzes().map(quiz => ({
      ...quiz,
      showQuestions: false
    }));
  }

  initiateDelete(quizId: string) {
    const quiz = this.quizzes.find(q => q.id === quizId);
    if (quiz) {
      this.quizToDelete = quizId;
      this.quizTitleToDelete = quiz.title;
      this.showDeleteModal = true;
    }
  }

  handleDeleteConfirmation(confirmed: boolean) {
    if (confirmed && this.quizToDelete) {
      try {
        this.quizService.deleteQuiz(this.quizToDelete);
        this.loadQuizzes();
        console.log(`Quiz ${this.quizToDelete} deleted successfully`);
      } catch (error) {
        console.error('Error deleting quiz:', error);
        alert('Failed to delete quiz. Please try again.');
      }
    }
    this.showDeleteModal = false;
    this.quizToDelete = null;
    this.quizTitleToDelete = '';
  }
}