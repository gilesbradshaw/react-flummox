import { Actions, Store, Flummox } from "flummox";
import {List} from "immutable";

class MessageActions extends Actions {
  newMessage(content) {
    return content; // automatically dispatched
  }
}

class MessageStore extends Store {
  constructor(flx) {
    super();

    const messageActions = flx.getActionIds("messages");
    this.register(messageActions.newMessage, this.handleNewMessage);
    this.messageCounter = 0;

    this.state = {list: new List()};
    this.handleNewMessage("initial message");
  }

  handleNewMessage(content) {
    const id = this.messageCounter++;

    this.setState(prev=>({list: prev.list.set(id, {content, id})}));
  }
  getMessages() {
    return this.state.list;
   }

}

class Flux extends Flummox {
  constructor() {
    super();

    this.createActions("messages", MessageActions);
    this.createStore("messages", MessageStore, this);
  }
}

export const flux = new Flux();
