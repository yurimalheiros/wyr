import React, { Component } from 'react'
import { connect } from 'react-redux'

class Error404 extends Component {
  render() {
    return (
      <div className="m-6 font-bold">
        Error 404 - Page Not Found
      </div>
    )
  }
}

export default connect()(Error404)

