'use strict';


import React, {addons} from 'react/addons';
import autobind from 'autobind-decorator';
//import {tryAction} from '../actions/actions';
//import {Map} from 'immutable';
import {flux} from '../flummox/flummox';
import FluxComponent from 'flummox/component';

var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
//require('../styles/main.css');

var imageURL = require('../images/yeoman.png');
class InnerComponent extends React.Component {
  render(){
    //alert(JSON.stringify(this.props));
    return <ul>
        ffff
      </ul>
      
  }
}

var YoreactApp = React.createClass({
  render: function() {
    return (
      <div>wdwdw</div>
    );
  }
});

module.exports = YoreactApp;

/*


'use strict';
import React, {addons} from 'react/addons';
import autobind from 'autobind-decorator';
import {tryAction} from '../actions/actions';
import {Map} from 'immutable';
import {flux} from '../flummox/flummox';
import FluxComponent from 'flummox/component';


require('normalize.css');
require('../styles/main.css');

class InnerComponent extends React.Component {
  @autobind
  render(){
    //alert(JSON.stringify(this.props));
    return <ul>
        {this.props.List.toArray().map(l=><li key={l.id}>{l.content}</li>)}
      </ul>
      
  }
}


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
    flux.getActions('messages').newMessage('Hello, world!');
  }
  render() {
    return (
      <FluxComponent flux={flux} connectToStores={['messages']}>
      <InnerComponent/>
        <div className='main'>
          <h1>--{this.state.value}--</h1>
          <addons.TransitionGroup>
            <button onClick={this.onClick}>click me</button>
            <img src={imageURL} />
            <div>hot reload.ecdecde..sssefcececesqw2</div>
          </addons.TransitionGroup>
        </div>
      </FluxComponent>
    );
  }
};
export default YoreactApp;


*/