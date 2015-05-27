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


class AsyncActions extends Actions {
  newMessage(content) {

    return new Promise((resolve)=>{
      setTimeout((()=>resolve(content)), 1000);
    });
  }
}

class AsyncStore extends Store {
  constructor(flx) {
    super();

    const messageActions = flx.getActionIds("asyncs");
    this.registerAsync(messageActions.newMessage, this.handleNewMessage, this.handleNewMessageBegin);
    this.handleNewMessage("initial async");
    this.handleNewMessageBegin("initial async begin");
  }
  messageCounter = 0;
  beginMessageCounter = 0;
  state = {
    list: new List([]),
    beginingList: new List([])
  };
  handleNewMessage(content) {
    const id = this.messageCounter++;

    this.setState(prev=>({list: prev.list.set(id, {content, id})}));
  }
  handleNewMessageBegin(content) {
    const id = this.beginMessageCounter++;

    this.setState(prev=>({beginingList: prev.beginingList.set(id, {content, id})}));
  }
  getMessages() {
    return this.state.list;
   }
  getBeginingMessages() {
    return this.state.beginingList;
   }
}


class Flux extends Flummox {
  constructor() {
    super();

    this.createActions("messages", MessageActions);
    this.createStore("messages", MessageStore, this);

    this.createActions("asyncs", AsyncActions);
    this.createStore("asyncs", AsyncStore, this);
  }
}

export const flux = new Flux();
