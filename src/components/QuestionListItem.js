import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class QuestionListItem extends Component {
  handleView = (e) => {
    e.preventDefault()
    this.props.history.push(`/question/${this.props.id}`)
  }

  render() {
    const { question } = this.props

    const {
      author, optionOne, optionTwo
    } = question

    return (
      <div className="my-6">
        <div className="text-sm text-gray-400">Question by {author}</div>
        <div className="font-bold">Would you rather</div>
        <div>{optionOne.text}
          <span> OR </span>
          {optionTwo.text}?
        </div>
        <button onClick={this.handleView} className="btn-sm">View</button>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: question
  }
}

export default withRouter(connect(mapStateToProps)(QuestionListItem))
