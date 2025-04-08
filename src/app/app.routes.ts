import { Routes } from '@angular/router';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizPlayerComponent } from './components/quiz-player/quiz-player.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create', component: QuizFormComponent },
  { path: 'create/:id', component: QuizFormComponent }, // Added edit route
  { path: 'quizzes', component: QuizListComponent },
  { path: 'quiz/:id', component: QuizPlayerComponent },
  { path: 'result', component: QuizResultComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];