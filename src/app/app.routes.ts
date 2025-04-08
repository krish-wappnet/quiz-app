import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizPlayerComponent } from './components/quiz-player/quiz-player.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';

export const routes: Routes = [
  { path: 'create', component: QuizFormComponent },
  { path: 'quizzes', component: QuizListComponent },
  { path: 'quiz/:id', component: QuizPlayerComponent },
  { path: 'result', component: QuizResultComponent },
  { path: '', redirectTo: '/quizzes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}