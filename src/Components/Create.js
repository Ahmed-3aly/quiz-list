import '../Styles/Create.css';
import React from 'react';

const initAnswer = {
  text: 'answer text',
  is_true: false,
};

const initAnswers = [
  {
    ...initAnswer,
    is_true: true,
  },{
    ...initAnswer,
  }
];

const initQuestion = {
  text: 'question text',
  feedback_false: 'false feedback',
  feedback_true: 'true feedback',
  answers: [...initAnswers],
};

export class Create extends React.Component
{
  state = {
    id: -1,
    title: 'quiz title',
    description: 'quiz description',
    url: 'https://www.youtube.com/watch?v=e6EGQFJLl04',
    questions_answers: [{
      ...initQuestion
    }],
  };
  componentDidMount() {
    const P = this.props;
    if (P && P.quiz) {
      this.setState({ ...P.quiz});
    }
  }
  setTitle(title) {
    const S = this.state;
    this.setState({ ...S, title, });
  }
  setDescription(description) {
    const S = this.state;
    this.setState({ ...S, description, });
  }
  setUrl(url) {
    const S = this.state;
    this.setState({ ...S, url, });
  }
  setQuestionText(questionIndex, text) {
    const S = this.state;
    const questionList = [...S.questions_answers];
    questionList[questionIndex].text = text;
    this.setState({ ...S, questions_answers: questionList, });
  }
  setQuestionFeedbackTrueText(questionIndex, text) {
    const S = this.state;
    const questionList = [...S.questions_answers];
    questionList[questionIndex].feedback_true = text;
    this.setState({ ...S, questions_answers: questionList, });
  }
  setQuestionFeedbackFalseText(questionIndex, text) {
    const S = this.state;
    const questionList = [...S.questions_answers];
    questionList[questionIndex].feedback_false = text;
    this.setState({ ...S, questions_answers: questionList, });
  }
  setAnswerText(questionIndex, answerIndex, text) {
    const S = this.state;
    const questionList = [...S.questions_answers];
    const answerList = questionList[questionIndex].answers;
    answerList[answerIndex].text = text;
    this.setState({ ...S, questions_answers: questionList, });
  }
  setAnswerTrue(questionIndex, answerIndex) {
    const S = this.state;
    const questionList = [...S.questions_answers];
    const answerList = questionList[questionIndex].answers;
    for (var i = 0; i < answerList.length; i++) {
      answerList[i].is_true = i === answerIndex;
    }
    this.setState({ ...S, questions_answers: questionList, });
  }
  deleteQuestion(questionIndex) {
    const S = this.state;
    let questionList = [];
    for (var i = 0; i < S.questions_answers.length; i++) {
      if (i === questionIndex) {
        continue;
      }
      questionList.push(S.questions_answers[i]);
    }
    this.setState({ ...S, questions_answers: questionList, });
  }
  deleteAnswer(questionIndex, answerIndex) {
    const S = this.state;
    const questionList = [...S.questions_answers];
    let answerList = questionList[questionIndex].answers;
    answerList = answerList.splice(answerIndex, 1);
    this.setState({ ...S, questions_answers: questionList, });
  }
  addAnswer(questionIndex) {
    const S = this.state;
    const questionList = [...S.questions_answers];
    let answerList = questionList[questionIndex].answers;
    const clone = JSON.stringify(initAnswer);
    answerList.push(JSON.parse(clone));
    this.setState({ ...S, questions_answers: questionList, });
  }
  addQuestion() {
    const S = this.state;
    const questionList = [...S.questions_answers];
    const clone = JSON.stringify(initQuestion);
    questionList.push(JSON.parse(clone));
    this.setState({ ...S, questions_answers: questionList, });
  }
  saveQuiz() {
    const P = this.props;
    const S = this.state;
    P.save(S);
  }
  render() {
    const P = this.props;
    const S = this.state;
    const label = S.id > -1 ? 'Edit' : 'Create';
    let canSubmit = true;
    if (!S.title || !S.description || !S.url) {
      canSubmit = false;
    }
    for (var i = 0; i < S.questions_answers.length; i++) {
      const k = S.questions_answers[i];
      if (!k.text || !k.feedback_false || !k.feedback_true) {
        canSubmit = false;
        break;
      }
      for (var j = 0; j < k.answers.length; j++) {
        const answer = k.answers[j];
        if (!answer.text) {
          canSubmit = false;
          break;
        }
      }
    }
    return (
      <div
        className='Create'
      >
        <h3>{label} Quiz</h3>
        <input
          type='text'
          placeholder='Quiz Title'
          value={S.title}
          onChange={(e) => this.setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Quiz Description'
          value={S.description}
          onChange={(e) => this.setDescription(e.target.value)}
        />
        <input
          type='text'
          placeholder='Quiz URL'
          value={S.url}
          onChange={(e) => this.setUrl(e.target.value)}
        />
        <div
          className='QuestionList'
        >
          <button
            onClick={() => this.addQuestion()}
          >
            Add Question
          </button>
          {S.questions_answers.map((x, i) => {
            const canAddAnswer = x.answers.length < 4;
            const canDeleteQuestion = S.questions_answers.length > 1;
            return (
              <div
                key={i}
                className='Question'
              >
                <input
                  type='text'
                  placeholder='Question Text'
                  value={x.text}
                  onChange={(e) => this.setQuestionText(i, e.target.value)}
                />
                <input
                  type='text'
                  placeholder='Question False Feedback'
                  value={x.feedback_false}
                  onChange={(e) => this.setQuestionFeedbackFalseText(i, e.target.value)}
                />
                <input
                  type='text'
                  placeholder='Question True Feedback'
                  value={x.feedback_true}
                  onChange={(e) => this.setQuestionFeedbackTrueText(i, e.target.value)}
                />
                <button
                  disabled={!canAddAnswer}
                  onClick={() => this.addAnswer(i)}
                >
                  Add Answer
                </button>              
                <div
                  className='AnswerList'
                >
                  {x.answers.map((y, j) => {
                    const canDeleteAnswer = x.answers.length > 2 && !y.is_true;
                    return (
                      <div
                        key={j}
                      >
                        <input
                          type='text'
                          placeholder='Answer Text'
                          value={y.text}
                          onChange={(e) => this.setAnswerText(i, j, e.target.value)}
                        />
                        <label>
                          <input
                            type='radio'
                            value={y.text}
                            name={i}
                            checked={y.is_true}
                            onChange={() => this.setAnswerTrue(i, j)}
                          />
                          Is True
                        </label>
                        {canDeleteAnswer && 
                          <button
                            disabled={!canDeleteAnswer}
                            onClick={() => this.deleteAnswer(i, j)}
                          >
                            Delete Answer
                          </button>
                        }
                      </div>
                    )
                  })}
                </div>
                <button
                  disabled={!canDeleteQuestion}
                  onClick={() => this.deleteQuestion(i)}
                >
                  Delete Question
                </button>
              </div>
            )
            })}
          </div>
        <button
          disabled={!canSubmit}
          onClick={() => this.saveQuiz()}
        >
          Submit
        </button>
      </div>
    );
  }
}
