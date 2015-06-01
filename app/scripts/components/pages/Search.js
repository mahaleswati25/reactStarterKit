import React from 'react';

const Search = React.createClass({
  getInitialState: function() {
    return {
      query: ''
    };
  },

  update: function() {
    this.setState({
      query: this.refs.query.getDOMNode().value
    });
  },

  render: function() {
    var result;

    if (this.state.query) {
      result = <p>You searched for <b>{this.state.query}</b></p>;
    }

    return (
      <div>
        <h1>Search</h1>
        <input type="text" ref="query" onChange={this.update}/>
        {result}
      </div>
    );
  }
});

export default Search;
