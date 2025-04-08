import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  cards = [
    { title: 'Take a Quiz', icon: 'Q', route: '/quizzes', description: 'Start a new quiz challenge' },
    { title: 'Create Quiz', icon: 'A', route: '/create', description: 'Create your own quiz' },
    { title: 'Leaderboard', icon: 'L', route: '/leaderboard', description: 'View top scores' }
  ];
}
