import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <div className="container mx-auto py-3 border-b-2 border-indigo-800">
        <ul className="inline-flex">
          <li className="px-3"><NavLink to='/' exact className="link">Home</NavLink></li>
          <li className="px-3"><NavLink to='/add' className="link">New Question</NavLink></li>
          <li className="px-3"><NavLink to='/leaderboard' className="link">Leader Board</NavLink></li>
          {this.props.userName !== ''
            ? <li className="px-3">
              <span>Hello, {this.props.userName}</span>
              <NavLink to='/signin' className="px-3 link">Logout</NavLink>
            </li>
            : null
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    userName: authedUser === '' ? '' : users[authedUser].name
  }
}

export default connect(mapStateToProps)(NavBar)
