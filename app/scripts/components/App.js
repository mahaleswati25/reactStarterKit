import React from 'react';
import Router from 'react-router';
var {Link, RouteHandler} = Router;

var App = React.createClass({
  getInitialState: function() {
    return {
      locations: [
        {
          abbr: 'FL',
          name: 'Florida'
        },
        {
          abbr: 'CA',
          name: 'California'
        },
        {
          abbr: 'AK',
          name: 'Alaska'
        }
      ]
    };
  },

  render: function () {
    this.state.locations.sort(function(a, b) {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    var links = this.state.locations.map(function(location) {
      return (
        <li key={location.abbr}>
          <Link
            to="location-detail"
            params={{ abbr: location.abbr }}
          >{location.name}</Link>
        </li>
      );
    });

    return (
      <div className="App">
        <ul className="Primary-Navigation">
          <li><Link to="/">Home</Link></li>
          <li><Link to="location-list">All Locations</Link></li>
          {links}
        </ul>

        <div className="Primary-Content">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

export default App;
