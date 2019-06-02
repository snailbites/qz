export interface question {
  question: string;
  choices: Array<string>;
  answerIdx: number;
}

const q1: question = {
  question: "Which word is three letters?",
  choices: ["book", "tree", "cat"],
  answerIdx: 2
};

const q2: question = {
  question: "What is 2 + 2?",
  choices: ["2", "3", "4"],
  answerIdx: 2
};

const q3: question = {
  question: "What is 3 + 5?",
  choices: ["1", "8", "3"],
  answerIdx: 1
};

const q4: question = {
  question: "What is 3 + 9?",
  choices: ["1", "8", "12"],
  answerIdx: 2
};

export const quiz: Array<question> = [q1, q2, q3, q4];
