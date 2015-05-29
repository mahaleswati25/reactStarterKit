import React from 'react';
import Router from 'react-router';
var {Route, DefaultRoute} = Router;

// Core application layout
import App from './components/App';
// Default layout
import Index from './components/pages/Index';

// List of all locations
import Locations from './components/pages/Locations';
// Location details
import LocationDetail from './components/pages/LocationDetail';

// Define application routes
var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Index}/>

    // Locations
    <Route name="location-list" path="/locations" handler={Locations}/>
    <Route name="location-detail" path="/locations/:abbr" handler={LocationDetail}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  var $rootNode = document.getElementById('root');
  React.render(<Handler/>, $rootNode);
});
