import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import QuestionList from './components/QuestionList'
import Question from './components/Question'
import SignIn from './components/SignIn'
import NewQuestion from './components/NewQuestion'
import LeaderBoard from './components/LeaderBoard'
import NavBar from './components/NavBar'
import Error404 from './components/Error404'


import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <div className="App">
          {this.props.loading === true
            ? null
            // : <SignIn />
            // : <Question id={"loxhs1bqm25b708cmbf3g"} />
            // : <NewQuestion  />
            : <div>
                <NavBar />
                <Route path="/" exact component={QuestionList} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/question/:id" component={Question} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route path="/signin" component={SignIn} />
                <Route path="/404" component={Error404} />
              </div>
          }
        </div>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}


export default connect(mapStateToProps)(App);
