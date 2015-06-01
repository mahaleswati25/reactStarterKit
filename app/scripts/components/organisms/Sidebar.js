import React from 'react';
import Router from 'react-router';
var {Link} = Router;

var Sidebar = React.createClass({
  render: function() {
    var links = this.props.navigation.map(function(location, i) {
      return (
        <li key={ i }>
          <Link to={ location.route }>{ location.name }</Link>
        </li>
      );
    });

    return (
      <ul className="Sidebar">
        {links}
      </ul>
    );
  }
});

module.exports = Sidebar;
