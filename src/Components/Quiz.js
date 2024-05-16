import '../Styles/Quiz.css';
import React from 'react';

export class Quiz extends React.Component
{
  state = {
    quiz: null,
    score: -1,
    submit_ids: [],
  };
  componentDidMount() {
    const P = this.props;
    const S = this.state;
    this.setState({ ...S, quiz: {...P.quiz}});
  }
  selectAnswer(questionId, answerId) {
    const S = this.state;
    let find = S.quiz.questions_answers.filter(x => x.id === questionId);
    let index = S.quiz.questions_answers.indexOf(find[0]);
    const clone = [ ...S.quiz.questions_answers, ];
    clone[index].answer_id = answerId;
    this.setState({...S,
      quiz: {
        ...S.quiz, 
        questions_answers: [ ...clone ]
      }
    });
  }
  submitAnswer(questionId) {
    const S = this.state;
    const find = S.submit_ids.indexOf(questionId);
    if (find > -1) {
      return;
    }
    const clone = [...S.submit_ids];
    clone.push(questionId);
    this.setState({...S, submit_ids: clone });
  }
  render() {
    const P = this.props;
    const S = this.state;
    if (!S.quiz) {
      return null;
    }
    const questionCount = S.quiz.questions_answers.length;
    const finished = questionCount === S.submit_ids.length;
    let score = '';
    if (finished) {
      let count = 0;
      for (var i = 0; i < questionCount; i++) {
        const j = S.quiz.questions_answers[i];
        const k = j.answers.filter(x => x.id === j.answer_id);
        if (k && k[0].is_true) {
          count++;
        }
      }
      score = `Score: ${count} of ${questionCount}`
    }
    return (
        <div
            className='Quiz'
        >
          <h3>{S.quiz.title}</h3>
          {S.quiz.questions_answers.map(x => {
            const trueId = x.answers.filter(y => y.is_true)[0];
            const trueAnswer =
              x.answer_id &&
              x.answer_id === trueId.id;
              const didSubmit =
                x.answer_id !== null &&
                S.submit_ids.indexOf(x.id) > -1;
              return (
              <div
                key={x.id}
                className='Question'
              >
                <div>
                  {x.text}
                </div>
                {x.answers.map(y => {
                  const id = 'radio_id_' + y.id;
                  return (
                    <div
                      key={y.id}
                      className='Answers'
                    >
                      <label
                        htmlFor={id}
                      >
                        <input
                          disabled={didSubmit}
                          id={id}
                          name={x.id}
                          type='radio'
                          value={y.id}
                          checked={y.id === x.answer_id}
                          onChange={() => this.selectAnswer(x.id, y.id)}
                        />
                        {y.text}
                      </label>
                    </div>
                  )
                })}
                {!didSubmit &&
                  <button
                    disabled={x.answer_id === null}
                    onClick={() => this.submitAnswer(x.id)}
                  >
                    Submit
                  </button>
                }
                {
                  didSubmit && trueAnswer && (
                    <div className='Feedback' >
                      {x.feedback_true}
                    </div>
                  )
                }
                {
                  didSubmit && !trueAnswer && (
                    <div className='Feedback' >
                      {x.feedback_false}
                    </div>
                  )
                }
              </div>
            );
          })}
          {finished && <h3>{score}</h3>}
          <button
            onClick={() => P.goBack()}
          >
            Back
          </button>
        </div>
    );
  }
}
