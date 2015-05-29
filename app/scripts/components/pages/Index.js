import React from 'react';
var NAME = 'React Testing Ground';

var FriendsContainer = React.createClass({
  getInitialState: function() {
    return {
      name: NAME
    };
  },
  render: function(){
    return (
      <div>
        <h1> Welcome to {this.state.name} </h1>
        <p> This is where content will be rendered for every route </p>
      </div>
    );
  }
});

export default FriendsContainer;
