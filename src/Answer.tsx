import * as React from "react";

interface AnswerProps {
  clickHandler: any;
  text: string;
  correct?: boolean;
  ref?: any;
}

interface AnswerState {}

export class Answer extends React.Component<AnswerProps, AnswerState> {
  constructor(props: AnswerProps) {
    super(props);
  }

  render() {
    const { clickHandler, text } = this.props;
    return (
      <span className="bubble bubble-answer" onClick={clickHandler}>
        {text}
      </span>
    );
  }
}
