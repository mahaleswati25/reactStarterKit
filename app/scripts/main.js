import React from 'react';
import Router from 'react-router';
var {Route, DefaultRoute, Redirect} = Router;
var ROOT_NODE_SELECTOR = '#root';

// Core application layout
import App from './components/App';

// Pages
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Items from './components/pages/Items';
import Item from './components/pages/Item';
import Account from './components/pages/Account';
import Search from './components/pages/Search';

// Routing
var routes = (
  <Route name="app" path="/" handler={App}>
    // Dashboard
    <DefaultRoute handler={Dashboard}/>
    <Route name="dashboard" path="dashboard" handler={Dashboard}/>

    // Signup/login/logout
    <Route name="signup" path="signup" handler={Signup}/>
    <Route name="login" path="login" handler={Login}/>

    // All items
    <Route name="items" path="items" handler={Items}/>
    // Single item
    <Route name="items.item" path="/items/:itemId" handler={Item}/>

    // Account/settings
    <Route name="account" path="account" handler={Account}/>

    // Search
    <Route name="search" path="search" handler={Search}/>

    // Redirects
    <Redirect from="logout" to="login" />
  </Route>
);

// Start listening and render all views to root node
Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.querySelector(ROOT_NODE_SELECTOR));
});
