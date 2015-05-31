import React, { Component} from "react/addons"; /* eslint no-unused-vars:0*/
import {Route, DefaultRoute, Link, RouteHandler} from "react-router";
import _ from "lodash";
import {List} from "immutable";
import dataDependencies from "./decorators/dataDependencies";
import displayName from "./decorators/displayName";
import {chan, take, put, go, timeout} from "../js-csp/src/csp";

export default class {
  made = {}
  render(render){
      this.made = _.extend(this.made, {render});
      return this;
  }
  path(path){
      this.made = _.extend(this.made, {path});
      return this;
  }
  menuText(menuText){
      this.made = _.extend(this.made, {menuText});
      return this;
  }
  title(title){
      this.made = _.extend(this.made, {title});
      return this;
  }
  link(){
    return (
      <li key={this.made.path}>
        <Link to={`sales-report-${this.made.path}`}>
          {this.made.title}
        </Link>
      </li>
    );
  }
  route(){
    const made = this.made;
    class handler extends Component {
      render(){
        //alert(JSON.stringify(this.props));
        return <div>{made.title}</div>;
      };
    }
    return (
      <Route
          key={made.path}
          path={made.path}
          name={`sales-report-${made.path}`}
          handler = {handler}/>
    );
  }
}

export const pageMaker = (path, name, title, pages)=>
  {
    class Menu extends Component {
      render(){
       return (
           <ul>
              {pages.map(r=>r.link())}
            </ul>
        );
      }
    }
    @dataDependencies({
      list: ()=>{
        return new Promise(
          resolve=>{
            const ch = chan();
            go(function* (){
                yield timeout(1000);
                console.log("okkkkkk");
                yield put(ch, new List([{id: 0, content: "ahhhh"}]));
            });
            go(function* (){
              resolve(yield take(ch));
              console.log("mmmmmmm");
            });
          }
        );
        /*new Promise(
          resolve=>
            setTimeout(
              (()=>{
                  resolve(new List([{id: 0, content: "ahhhh"}]));
                }
              ),
              1000)
        );
        */
      }
    })
    @displayName(`${name}-Page`)
    class Page extends Component {
      render(){
        const list = this.props.list.toArray ? this.props.list.toArray() : this.props.list;
        return (
          <div>
            <div>{title}</div>
            <ul>
              {list.map(l=><li key={l.id}>{l.content}:-angie!ugsgsgsgsuuuu!-:{l.id}</li>)}
            </ul>
            <RouteHandler {...this.props} />
          </div>
        );
      };
    }
    class DefaultPage extends Component {
      render(){
        return (
          <div>
            <Menu/>
          </div>
        );
      };
    }
    const routes = ()=>
      <Route path={path} name={name} handler={Page}>
        <DefaultRoute handler={DefaultPage}/>
        {pages.map(r=>r.route())}
      </Route>;
    return {routes, Page, Menu};
  };

