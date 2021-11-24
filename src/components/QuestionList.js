import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import QuestionListItem from './QuestionListItem'

class QuestionList extends Component {
  state = {
    listToShow: 'unanswered'
  }

  componentDidMount() {
    if (this.props.authedUser === '') {
      this.props.history.push('/signin')
    }
  }

  handleListChange = (listToShow) => {
    this.setState(() => ({
      listToShow
    }))
  }

  render() {
    return (
      <div>
        <div className="pt-4">
          <button onClick={() => this.handleListChange('unanswered')} className={this.state.listToShow === 'unanswered' ? 'font-bold btn-link' : 'btn-link'}>Unanswered Questions</button>

          <button onClick={() => this.handleListChange('answered')} className={this.state.listToShow === 'answered' ? 'font-bold btn-link' : 'btn-link'}>Answered Questions</button>
        </div>

        {this.state.listToShow === 'unanswered'
          ? (
            <ul>
              {this.props.questionIds
                .filter((id) => (!this.props.answeredQuestions.includes(id)))
                .map((id) => (
                  <li key={id}>
                    <QuestionListItem id={id} />
                  </li>
              ))}
            </ul>
          )
          : null
        }

        {this.state.listToShow === 'answered'
          ? (
            <ul>
              {this.props.questionIds
                .filter((id) => (this.props.answeredQuestions.includes(id)))
                .map((id) => (
                  <li key={id}>
                    <QuestionListItem id={id} />
                  </li>
                ))}
            </ul>
          )
          : null
        }
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  return authedUser === ''
    ? {
      questionIds: [],
      authedUser
    }
    : {
      questionIds: Object.keys(questions)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
      answeredQuestions: Object.keys(users[authedUser].answers),
      authedUser
    }
}

export default withRouter(connect(mapStateToProps)(QuestionList))
