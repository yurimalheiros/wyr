import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class LeaderBoard extends Component {
  componentDidMount() {
    if (this.props.authedUser === '') {
      this.props.history.push('/signin')
    }
  }

  render() {
    return (
      <div className="container mx-auto py-6">
        <h2 className="title">LeaderBoard</h2>
        <ul>
          {this.props.ranking.map((user) => (
            <li key={user.id} className="m-6">
              <img className="inline object-cover w-8 h-8 rounded-full" src={user.avatarURL} alt="User avatar" />
              <div className="font-bold">{user.name}</div>
              <div className="text-sm">Answered: {user.answeredQuestionsCount}</div>
              <div className="text-sm">Created: {user.createdQuestionsCount}</div>
              <div className="text-sm font-bold">Total: {user.answeredQuestionsCount + user.createdQuestionsCount}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  const usersIds = Object.keys(users)
  const ranking = usersIds.map((id) => ({
    id,
    name: users[id].name,
    avatarURL: users[id].avatarURL,
    answeredQuestionsCount: Object.keys(users[id].answers).length,
    createdQuestionsCount: users[id].questions.length,
  }))

  ranking.sort((a, b) => (b.answeredQuestionsCount + b.createdQuestionsCount) - (a.answeredQuestionsCount + a.createdQuestionsCount))

  return {
    ranking,
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(LeaderBoard))
