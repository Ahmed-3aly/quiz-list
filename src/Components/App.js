import '../Styles/App.css';
import React from 'react';
import { quizList } from '../quizList';
import { List } from './List';
import { Quiz } from './Quiz';
import { Create } from './Create';

const renderMode = {
  list: 0,
  quiz: 1,
  create: 2,
  edit: 3,
}

class App extends React.Component
{
  state = {
    mode: renderMode.list,
    quiz_id: null,
    list: []
  };
  async componentDidMount() {
    const S = this.state;
    this.setState({ ...S, list: [...quizList] });
	}
  setMode(mode) {
    const S = this.state;
    this.setState({ ...S, mode, });
  }
  setQuiz(quizId) {
    const S = this.state;
    this.setState({
      ...S,
      quiz_id: quizId,
      mode: renderMode.quiz,
    });
  }
  setEdit(quizId) {
    const S = this.state;
    this.setState({
      ...S,
      quiz_id: quizId,
      mode: renderMode.edit,
    });
  }
  saveQuiz(quizJson) {
    const S = this.state;
    let isAppend = false;
    if (!(quizJson.id > -1)) {
      isAppend = true;
      const usedIds = S.list.map(x => x.id);
      let newId = -1;
      for (var i = 0; i < usedIds.length; i++) {
        if (usedIds.indexOf(i) > -1) {
          continue;
        }
        newId = i;
      }
      quizJson.id = newId;
    }
    for (var i = 0; i < quizJson.questions_answers.length; i++) {
      const question = quizJson.questions_answers[i];
      question.id = i;
      for (var j = 0; j < question.answers.length; j++) {
        const answer = question.answers[j];
        answer.id = j;
      }
    }
    let list = JSON.parse(JSON.stringify(S.list));
    if (isAppend) {
      list.push(quizJson);
    }
    else {
      for (var i = 0; i < list.length; i++) {
        const j = list[i];
        if (quizJson.id === j.id) {
          list[i] = quizJson;
        }
      }
    }
    this.setState({
      ...S,
      list,
      mode: renderMode.list,
    });
  }
  renderCreate() {
    return (
      <Create
        save={(e) => this.saveQuiz(e)}
      />
    );
  }
  renderEdit() {
    const S = this.state;
    const find = S.list.filter(x => x.id === S.quiz_id);
    if (!(find.length > -1)) {
      return null;
    }
    return (
      <Create
        quiz={find[0]}
        save={(e) => this.saveQuiz(e)}
      />
    );
  }
  renderQuiz() {
    const S = this.state;
    const find = S.list.filter(x => x.id === S.quiz_id);
    if (!(find.length > -1)) {
      return null;
    }
    return (
      <Quiz
        quiz={find[0]}
        goBack={() => this.setMode(renderMode.list)}
      />
    );
  }
  render() {
    const S = this.state;
    if (S.mode === renderMode.create) {
      return this.renderCreate();
    }
    if (S.mode === renderMode.edit) {
      return this.renderEdit();
    }
    if (S.mode === renderMode.quiz) {
      return this.renderQuiz();
    }
    return (
      <List
        quizList={S.list}
        editQuiz={(quizId) => this.setEdit(quizId)}
        takeQuiz={(quizId) => this.setQuiz(quizId)}
        createQuiz={() => this.setMode(renderMode.create)}
      />
    );
 }
}

export default App;
