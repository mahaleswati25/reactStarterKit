import React from 'react';
import Router from 'react-router';
import Sidebar from './organisms/Sidebar';
var {RouteHandler} = Router;

var App = React.createClass({
  getInitialState: function() {
    return {
      navigation: [
        {
          name: 'Sign Up',
          route: '/signup'
        },
        {
          name: 'Log In',
          route: '/login'
        },
        {
          name: 'Dashboard',
          route: '/dashboard'
        },
        {
          name: 'Items',
          route: '/items'
        },
        {
          name: 'Account',
          route: '/account'
        },
        {
          name: 'Search',
          route: '/search'
        }
      ]
    };
  },

  render: function () {
    return (
      <div className="App">
        <Sidebar navigation={this.state.navigation}/>

        <div className="Primary-Content">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

export default App;
