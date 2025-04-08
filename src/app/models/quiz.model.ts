export interface Question {
    text: string;
    options: string[]; // Still 4 options
    correctAnswers: number[]; // Array of indices (0-3) for correct answers
  }
  export interface Quiz {
    id: string;
    title: string;
    questions: Question[];
  }