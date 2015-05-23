'use strict';
import React, {addons, Component} from 'react/addons';
import autobind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import FluxComponent from 'flummox/component';
import fluxComponent from '../flummox/decorators/fluxComponent';
import fluxContext from '../flummox/decorators/fluxContext';

import connectToStores from 'flummox/connect';


require('normalize.css');
require('../styles/main.css');


@fluxContext
@pureRender
class InnerComponent extends React.Component {
  constructor(){
    super(...arguments);
    this.onClick=this.onClick.bind(this);
  } 
  onClick(){
    const flux = this.context.flux;
    const ids = flux.getActionIds('messages');
    flux.getActions('messages').newMessage('Hello, world!');
  }
  render(){
    //alert(JSON.stringify(this.props));
    return <div>
        <button onClick={this.onClick}>click me</button>
        <ul>
          {this.props.list.toArray().map(l=><li key={l.id}>{l.content}:--:{l.id}</li>)}
        </ul>
      </div>
  }
}

@fluxComponent({
  connectToStores: {
    messages: store => ({ 
      list: store.getMessages() 
    }) 
  }
})
export default class YoreactApp extends Component {
  render() {
    const {list}=this.props;
    return (      
          list ?<InnerComponent list={list}/>:<script/>
    );
  }
};