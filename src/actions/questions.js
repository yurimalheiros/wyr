import {
  saveQuestion,
  saveQuestionAnswer
} from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    return saveQuestion(question)
      .then((question) => dispatch(addQuestion(question)))
  }

}


function addQuestionAnswer(id, authedUser, answer) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    id,
    answer
  }
}

export function handleAddQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const {
      authedUser
    } = getState()

    return saveQuestionAnswer({
        authedUser,
        qid,
        answer
      })
      .then(() => dispatch(addQuestionAnswer(qid, authedUser, answer)))
  }
}