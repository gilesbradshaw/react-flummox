'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
//require('../styles/main.css');

var imageURL = require('../images/yeoman.png');

var YoreactApp = React.createClass({
  render: function() {
    return (
      <div className='main'>
        <ReactTransitionGroup transitionName="fade">
          <img src={imageURL} />
          <div>hot reload...sssefcececesqw2</div>
        </ReactTransitionGroup>
      </div>
    );
  }
});

module.exports = YoreactApp;
