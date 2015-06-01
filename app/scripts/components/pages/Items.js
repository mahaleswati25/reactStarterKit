import React from 'react';
import ThumbnailLink from '../molecules/ThumbnailLink';
import getJSON from '../../helpers/getJSON';

var ITEMS_API = 'http://jsonplaceholder.typicode.com/photos';

var Items = React.createClass({
  getItems: function() {
    getJSON(ITEMS_API).then((res) => {
      var items = res;
      items.length = 5;

      if (this.isMounted()) {
        this.setState({
          items: items
        });
      }
    });
  },

  getInitialState: function() {
    return {
      items: []
    };
  },

  componentDidMount: function() {
    this.getItems();
  },

  render: function() {
    var items = this.state.items.map(function(item) {
      return (
        <ThumbnailLink
          id={item.id}
          key={item.id}
          title={item.title}
          image={item.thumbnailUrl}/>
      );
    });

    return (
      <div>
        <h1>All Items</h1>
        <ul>
          {items}
        </ul>
      </div>
    );
  }
});

module.exports = Items;
