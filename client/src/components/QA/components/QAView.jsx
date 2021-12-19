import React from 'react';

let QAView = (props) => {
  return <ul>
    {props.questions.slice(0, 3).map((q) => {
      return <li key={q.question_id}>{q.question_body}</li>;
    })}
  </ul>;
}

export default QAView;
