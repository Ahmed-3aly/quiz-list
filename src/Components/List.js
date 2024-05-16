import '../Styles/List.css';
import React from 'react';

export function List({
  quizList,
  takeQuiz,
  editQuiz,
  createQuiz,
})
{
  return (
    <div className='List' >
      <button
        onClick={() => createQuiz()}
      >
        Create
      </button>
      <div className='QuizList' >
        {quizList.map(x => (
          <div
            key={x.id}
          >
            <div>
              <div>{x.title}</div>
              <div>{x.description}</div>
              <a href={x.url} >{x.url}</a>
            </div>
            <div>
              <button
                onClick={() => takeQuiz(x.id)}
              >
                Take
              </button>
              <div />
              <button
                onClick={() => editQuiz(x.id)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}
