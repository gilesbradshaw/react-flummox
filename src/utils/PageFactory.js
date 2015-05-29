import React, { Component} from "react/addons"; /* eslint no-unused-vars:0*/
import {Route, Link, RouteHandler} from "react-router";
import _ from "lodash";

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
    class Page extends Component {
      render(){
        //alert(JSON.stringify(this.props));
        return (
          <div>
            <div>{title}</div>
            <Menu/>
            <RouteHandler {...this.props} />
          </div>
        );
      };
    }
    const routes = ()=>
      <Route path={path} name={name} handler={Page}>
        {pages.map(r=>r.route())}
      </Route>;
    return {routes, Page, Menu};
  };

