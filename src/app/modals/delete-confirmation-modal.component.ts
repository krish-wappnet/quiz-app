// delete-confirmation-modal.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen">
      <div class="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete "{{ quizTitle }}"?</p>
        <p>This action cannot be undone.</p>
        <div class="modal-buttons">
          <button class="cancel-btn" (click)="close()">Cancel</button>
          <button class="confirm-btn" (click)="confirm()">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 400px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    h3 {
      margin: 0 0 15px;
      color: #333;
    }
    p {
      margin: 10px 0;
      color: #666;
    }
    .modal-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }
    button {
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;
    }
    .cancel-btn {
      background: #f0f0f0;
      border: 1px solid #ccc;
      color: #333;
    }
    .confirm-btn {
      background: #333;
      border: 1px solid #333;
      color: white;
    }
    .confirm-btn:hover {
      background: #555;
      border-color: #555;
    }
    .cancel-btn:hover {
      background: #e0e0e0;
    }
  `]
})
export class DeleteConfirmationModalComponent {
  @Input() isOpen: boolean = false;
  @Input() quizTitle: string = '';
  @Output() confirmed = new EventEmitter<boolean>();

  close() {
    this.confirmed.emit(false);
  }

  confirm() {
    this.confirmed.emit(true);
  }
}