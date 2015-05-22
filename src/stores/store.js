import Reflux from 'reflux';
import {tryAction} from '../actions/actions';

const tryStore = Reflux.createStore(
	{
		init:function(){
			this.listenTo(tryAction, this.action);
		},
		action:function(value){
			this.trigger(value);
		}
	}
);
export {tryStore};
