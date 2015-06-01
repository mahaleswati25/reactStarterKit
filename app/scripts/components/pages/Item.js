import React from 'react';
import getJSON from '../../helpers/getJSON';
import ContactCard from '../organisms/ContactCard';

var ITEM_API = 'http://jsonplaceholder.typicode.com/users/';

var Item = React.createClass({
  getItem: function() {
    var itemId = this.props.params.itemId;
    var itemDetailAPI = ITEM_API + itemId;

    getJSON(itemDetailAPI).then((res) => {
      var item = res;

      this.setState({
        item: item
      });
    });
  },

  getInitialState: function() {
    return {
      item: {}
    };
  },

  componentDidMount: function() {
    this.getItem();
  },

  render: function() {
    return (
      <ContactCard data={this.state.item}/>
    );
  }
});

module.exports = Item;
