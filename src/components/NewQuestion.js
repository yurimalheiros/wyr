import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { withRouter } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: ''
  }

  componentDidMount() {
    if (this.props.authedUser === '') {
      this.props.history.push('/signin')
    }
  }

  handleOptionOneChange = (e) => {
    const optionOne = e.target.value

    this.setState(() => ({
      optionOne
    }))
  }

  handleOptionTwoChange = (e) => {
    const optionTwo = e.target.value

    this.setState(() => ({
      optionTwo
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { authedUser, dispatch } = this.props
    const { optionOne, optionTwo } = this.state

    const question = {
      author: authedUser,
      optionOneText: optionOne,
      optionTwoText: optionTwo
    }

    dispatch(handleAddQuestion(question))

    this.props.history.push('/')
  }


  render() {
    const { optionOne, optionTwo } = this.state

    return (
      <div className="container mx-auto py-6">
        <h2 className="title">Create New Question</h2>
        <h3 className="subtitle">Would you rather</h3>

        <form onSubmit={this.handleSubmit}>
          <input type="text"
            placeholder="Type the first option"
            value={optionOne}
            onChange={this.handleOptionOneChange}
            className="input"
          />

          <div className="my-2">OR</div>

          <input type="text"
            placeholder="Type the second option"
            value={optionTwo}
            onChange={this.handleOptionTwoChange}
            className="input"
          />
          <div className="mt-4">
            <button disabled={optionOne === '' || optionTwo === ''} className="btn">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))
