
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render: function () {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    )
  }
})
