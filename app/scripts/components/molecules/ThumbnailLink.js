import React from 'react';
import Router from 'react-router';
import LazyLoadImage from '../atoms/LazyLoadImage';
var {Link} = Router;

var ThumbnailLink = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired
  },

  render: function() {
    var listItemStyle = {
      display: 'inline',
      marginLeft: 5,
      marginRight: 5
    };

    return (
      <li style={listItemStyle}>
        <Link
          to="items.item"
          params={{itemId: this.props.id}}
          title={this.props.title}>
          <LazyLoadImage src={this.props.image} alt={this.props.title}/>
        </Link>
      </li>
    );
  }
});

module.exports = ThumbnailLink;
