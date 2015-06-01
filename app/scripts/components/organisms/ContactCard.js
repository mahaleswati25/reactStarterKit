import React from 'react';

var ContactCard = React.createClass({
  render: function() {
    return (
      <div>
        <h1>{this.props.data.name}</h1>
        <ul>
          <li>{this.props.data.phone}</li>
          <li>{this.props.data.email}</li>
          <li>{this.props.data.website}</li>
          <li>@{this.props.data.username}</li>
        </ul>
      </div>
    );
  }
});

module.exports = ContactCard;
