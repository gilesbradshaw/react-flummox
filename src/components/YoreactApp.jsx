'use strict';
import React, {addons, Component} from 'react/addons';
import autobind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import FluxComponent from 'flummox/component';


require('normalize.css');
require('../styles/main.css');

const fluxContext = (target)=>
{
  target.contextTypes= {
    flux: React.PropTypes.object.isRequired
  };
  return target
}

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
          {this.props.List.toArray().map(l=><li key={l.id}>{l.content}:-----:{l.id}</li>)}
        </ul>
      </div>
      
  }
}




class YoreactApp extends Component {
  render() {
    return (
        <FluxComponent  connectToStores={['messages']}>        
          <InnerComponent/>
        </FluxComponent>      
    );
  }
};
//YoreactApp.contextTypes= {
//    flux: React.PropTypes.object.isRequired
//};
export default YoreactApp;

