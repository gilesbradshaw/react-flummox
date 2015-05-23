import { Actions, Store, Flummox } from 'flummox';
//import {List} from 'immutable';

class MessageActions extends Actions {
  newMessage(content) {
    return content; // automatically dispatched
  }
}

class MessageStore extends Store {
  constructor(flux) {
    super();

    const messageActions = flux.getActions('messages');
    this.register(messageActions.newMessage, this.handleNewMessage);
    this.messageCounter = 0;

    //this.state = {List:List()};
  }

  handleNewMessage(content) {
    const id = this.messageCounter++;

   //this.setState(prev=>({List:prev.List.set(id,{content,id})}));
  }
}

class Flux extends Flummox {
  constructor() {
    super();

    this.createActions('messages', MessageActions);
    this.createStore('messages', MessageStore, this);
  }
}

export const flux = new Flux();
