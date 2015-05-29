import React from 'react';

var httpMock = {
  // Response time, in ms
  delay: 100,

  // Simulate GET request.
  // Responds after delay
  // and processes the data
  // using a transformation function.
  get: function(url, transform) {
    var _this = this;

    return {
      // Provide promise-style API
      done: function(callback) {
        // Execute callback after delay
        setTimeout(function() {
          callback.call(_this, transform(url));
        }, _this.delay);
      }
    };
  }
};

var LOCATION_DATA = {
  'CA': {name: 'California', population: 3500000},
  'FL': {name: 'Florida', population: 2500000},
  'AK': {name: 'Alaska', population: 1800000}
};

function getLocationData(url) {
  var resource = url.replace(/^(\/.*\/)/, '');
  var locationData = LOCATION_DATA[resource];

  return {
    abbr: resource,
    name: locationData.name,
    population: locationData.population
  };
}

var ShowList = React.createClass({
  getLocationData: function(abbr) {
    httpMock.get('/api/' + abbr, getLocationData)
    .done(function(res) {
      this.setState({
        abbr: abbr,
        name: res.name,
        population: res.population
      });
    }.bind(this));
  },

  getInitialState: function() {
    return {
      abbr: this.props.params.abbr,
      name: '',
      population: 0
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var abbr = nextProps.params.abbr;
    this.getLocationData(abbr);

    return nextProps.params;
  },

  componentDidMount: function() {
    var abbr = this.props.params.abbr;
    this.getLocationData(abbr);
  },

  render: function() {
    return (
      <div>
        <h3> Information about {this.state.name} </h3>
        <ul>
          <li>{this.state.population}</li>
        </ul>
      </div>
    );
  }
});

module.exports = ShowList;
