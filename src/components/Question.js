import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { handleAddQuestionAnswer } from '../actions/questions'

class Question extends Component {
  state = {
    answer: '',
  }

  componentDidMount() {
    if (this.props.authedUser === '') {
      this.props.history.push('/signin', { questionId: this.props.match.params.id })
    }
  }

  handleChange = (e) => {
    const answer = e.target.value

    this.setState(() => ({
      answer
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { answer } = this.state
    const { question, dispatch } = this.props

    dispatch(handleAddQuestionAnswer(question.id, answer))
  }

  render() {
    const { question, authorName, authorAvatarURL } = this.props

    if (question) {
      const { optionOne, optionTwo} = question

      return (
        <div className="mt-4">
          <img className="inline object-cover w-8 h-8 rounded-full" src={authorAvatarURL} alt="User avatar" />
          <div className="text-gray-400">Question by {authorName}</div>
          <div className="subtitle">Would you rather</div>

          {this.props.didVote
            ? (
              <div>
                <div>
                  <div className="font-bold">{optionOne.text}
                    {
                      this.props.didVoteOptionOne
                      && <span className="text-green-600"> (your pick)</span>
                    }
                  </div>

                  <div className="text-sm">
                    {this.props.optionOneCount} out of {this.props.allVotesCount} votes ({Number(this.props.optionOneCount / this.props.allVotesCount * 100).toFixed(1)}%)
                  </div>
                </div>

                <div className="my-2">OR</div>

                <div>
                  <div className="font-bold">{optionTwo.text}
                    {
                      this.props.didVoteOptionTwo
                      && <span className="text-green-600"> (your pick)</span>
                    }
                  </div>

                  <div className="text-sm">
                    {this.props.optionTwoCount} out of {this.props.allVotesCount} votes ({Number(this.props.optionTwoCount / this.props.allVotesCount * 100).toFixed(1)}%)
                  </div>
                </div>
              </div>
            )
            : (
              <form onSubmit={this.handleSubmit}>
                <input type="radio"
                  id="answerOne"
                  name="answer"
                  value="optionOne"
                  checked={this.state.answer === "optionOne"}
                  onChange={this.handleChange}
                  className="radio"
                />

                <label htmlFor="answerOne">{optionOne.text}</label>

                <div className="my-2">OR</div>

                <input type="radio"
                  id="answerTwo"
                  name="answer"
                  value="optionTwo"
                  checked={this.state.answer === "optionTwo"}
                  onChange={this.handleChange}
                  className="radio"
                />

                <label htmlFor="answerTwo">{optionTwo.text}</label>

                <div className="mt-4">
                  <button className="btn">Submit</button>
                </div>
              </form>

            )
          }
        </div>
      )
    } else {
      return <Redirect to="/404" />
    }
  }
}

function mapStateToProps({ questions, authedUser, users }, props) {
  const id = props.match.params.id

  if (Object.keys(questions).includes(id)) {
    const question = questions[id]
    const allVotes = question.optionOne.votes.concat(question.optionTwo.votes)

    return {
      question: question,
      authorName: users[question.author].name,
      authorAvatarURL: users[question.author].avatarURL,
      didVoteOptionOne: question.optionOne.votes.includes(authedUser),
      didVoteOptionTwo: question.optionTwo.votes.includes(authedUser),
      didVote: allVotes.includes(authedUser),
      optionOneCount: question.optionOne.votes.length,
      optionTwoCount: question.optionTwo.votes.length,
      allVotesCount: allVotes.length,
      authedUser
    }
  } else {
    return {
      question: null,
      didVote: false,
      optionOneCount: 0,
      optionTwoCount: 0,
      allVotesCount: 0,
      authedUser
    }
  }
}

export default withRouter(connect(mapStateToProps)(Question))
