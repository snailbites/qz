import * as React from "react";
import { Question } from "./Question";
import { Answer } from "./Answer";

const API = "http://localhost:8080/api";
const QUESTION_DURATION = 1000;

interface Status {
  right: number;
  wrong: number;
}

interface QuizProps {}
interface QuizState {
  questions: Array<any>; // TODO: set a universal type
  completed: boolean;
  status: Status;
}

export class Quiz extends React.Component<QuizProps, QuizState> {
  public childRefs: any;
  public answerRefs: any;
  public currStep: number;
  public currQ: number;

  constructor(props: QuizProps) {
    super(props);

    this.childRefs = [];
    this.answerRefs = [];
    this.currStep = 0;
    this.currQ = 0;

    this.state = {
      questions: [],
      completed: false,
      status: { right: 0, wrong: 0 }
    };
  }

  public async componentDidMount() {
    this.fetchData();
  }

  public componentDidUpdate() {
    if (this.childRefs.length > 0) {
      this.childRefs[0].setState({
        isVisible: true
      });
    }
    this.startTimer();
  }

  public componentWillUnmount() {}

  private startTimer() {
    let timer = setInterval(() => {
      const child = this.childRefs[this.currStep];
      if (this.currStep < this.childRefs.length) {
        if (!child) {
          clearTimeout(timer);
        } else if (typeof child.setState === "function") {
          child.setState({
            isVisible: true
          });
          this.currStep++;
        } else {
          child.style.display = "block";
          clearTimeout(timer);
          this.currStep++;
        }

        // keep everything at the bottom
        window.scrollTo(0, document.body.scrollHeight);
      } else {
        clearTimeout(timer);
      }
    }, QUESTION_DURATION);
  }

  public handleClick(idx: number, e: React.MouseEvent) {
    e.preventDefault();

    let currStatus = this.state.status;
    const completed = this.currStep >= this.childRefs.length;

    if (idx === this.state.questions[this.currQ].answerIdx) {
      currStatus.right++;
    } else {
      currStatus.wrong++;
    }

    if (!completed) {
      this.currQ++;
      this.startTimer();
    } else {
      this.setState({
        completed: completed,
        status: currStatus
      });
    }
  }

  public startQuiz = (e: React.MouseEvent) => {
    e.preventDefault();
    this.startTimer();
  };

  public reset = () => {
    this.currStep = 1;
    this.setState({
      completed: false,
      status: { right: 0, wrong: 0 }
    });
  };

  render() {
    const { completed, status, questions } = this.state;

    if (!questions || questions.length === 0) {
      return <div />;
    }

    return (
      <div className="wrapper">
        <Question
          ref={q => {
            this.childRefs.push(q);
          }}
          question={"Welcome to the Qz Quiz Show!"}
        />
        <Question
          ref={q => {
            this.childRefs.push(q);
          }}
          question={"We're going to give you 4 questions to answer."}
        />
        <Question
          ref={q => {
            this.childRefs.push(q);
          }}
          question={"Each with 3 choices."}
        />
        <Question
          ref={q => {
            this.childRefs.push(q);
          }}
          question={"Take your time (because I didn't build a timer!)"}
        />
        <Question
          ref={q => {
            this.childRefs.push(q);
          }}
          question={"Ready to play?"}
        />
        <div
          className="answer hidden"
          ref={q => {
            this.childRefs.push(q);
          }}
        >
          <Answer clickHandler={this.startQuiz.bind(this)} text={"Yup!"} />
        </div>
        <section>
          {questions &&
            questions.map((q, qIdx) => (
              <div key={qIdx}>
                <Question
                  ref={a => {
                    this.childRefs.push(a);
                  }}
                  question={q.question}
                />
                <div
                  className="answer hidden"
                  ref={a => {
                    this.childRefs.push(a);
                  }}
                >
                  {q.choices.map((answer, aIdx) => (
                    <Answer
                      ref={a => {
                        this.answerRefs.push(a);
                      }}
                      correct={questions[qIdx].answerIdx === aIdx}
                      key={aIdx}
                      clickHandler={this.handleClick.bind(this, aIdx)}
                      text={answer}
                    />
                  ))}
                </div>
              </div>
            ))}
        </section>
        {completed && (
          <section>
            <div>
              <span className="bubble bubble-question">
                You're all done for today! You got {status.right} right and{" "}
                {status.wrong} wrong. Come back tomorrow!
              </span>
            </div>
          </section>
        )}
      </div>
    );
  }

  private async fetchData() {
    try {
      const response = await fetch(`${API}/quiz`);
      const json = await response.json();

      this.setState({
        questions: json
      });
    } catch {
      console.error("No data!");
    }
  }
}
