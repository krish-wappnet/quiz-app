export interface Question {
    text: string;
    options: string[];
    correctAnswer: number;
  }
  
  export interface Quiz {
    id: string;
    title: string;
    questions: Question[];
  }