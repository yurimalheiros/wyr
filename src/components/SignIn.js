import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'

class SignIn extends Component {
  state = {
    user: '',
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(setAuthedUser(''))
  }

  handleChange = (e) => {
    const user = e.target.value

    this.setState(() => ({
      user
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { user } = this.state
    const { dispatch } = this.props

    dispatch(setAuthedUser(user))

    if (this.props.location.state && Object.keys(this.props.location.state).includes('questionId')) {
      this.props.history.push(`/question/${this.props.location.state.questionId}`)
    } else {
      this.props.history.push('/')
    }

  }

  render() {
    return (
      <div className="container mx-auto py-6">
        <h2 className="title">Sign In</h2>

        <form onSubmit={this.handleSubmit}>
          <select value={this.state.user} onChange={this.handleChange} className="bg-gray-200 border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500">
            <option value="" disabled>Select a user</option>
            {this.props.users.map((user) => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          <div className="mt-4">
            <button type="submit" disabled={!this.state.user} className="btn">
              Sign In
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users).map((id) => ({
      id,
      name: users[id].name
    }))
  }
}

export default withRouter(connect(mapStateToProps)(SignIn))
