// FIXME: does not lazy load images, just loads them
import React from 'react';

var LazyLoadImage = React.createClass({
  propTypes: {
    src: React.PropTypes.string.isRequired,
    alt: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      src: '/lazy-load-image-source',
      alt: 'This should be the lazy load preload image'
    };
  },

  // Need to replace preload image with the real
  // one once it has scrolled into the viewport
  render: function() {
    var style = {
      width: 75,
      height: 75
    };

    return (
      <img src={this.props.src} alt={this.props.alt} style={style}/>
    );
  }
});

module.exports = LazyLoadImage;
