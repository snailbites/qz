import * as React from "react";

interface QuestionProps {
  question: string;
}
interface QuestionState {
  isVisible?: boolean;
}

export class Question extends React.Component<QuestionProps, QuestionState> {
  constructor(props: QuestionProps) {
    super(props);

    this.state = {
      isVisible: false
    };
  }

  render() {
    const { question } = this.props;
    const { isVisible } = this.state;

    return (
      <div className={isVisible ? null : "hidden"}>
        <span className="bubble bubble-question">
          {isVisible}
          {question}
        </span>
      </div>
    );
  }
}
