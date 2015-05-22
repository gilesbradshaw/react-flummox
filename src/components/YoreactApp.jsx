'use strict';
import React, {addons} from 'react/addons';
import autobind from 'autobind-decorator';
import {tryAction} from '../actions/actions';
import {Map} from 'immutable';


require('normalize.css');
require('../styles/main.css');


const imageURL = require('../images/yeoman.png');
class YoreactApp extends React.Component {
  constructor(){
    super(...arguments);
    tryAction.listen((value)=>
      {
        this.setState(prev=>({value:value}));
      }
    );
    this.state = {
        value:'mmm'
    };
  }
  onClick(){
    tryAction('ok');
  }
  render() {
    return (
      <div className='main'>
        <h1>--{this.state.value}--</h1>
        <addons.TransitionGroup>
          <button onClick={this.onClick}>click me</button>
          <img src={imageURL} />
          <div>hot reload.ecdecde..sssefcececesqw2</div>
        </addons.TransitionGroup>
      </div>
    );
  }
};
export default YoreactApp;

