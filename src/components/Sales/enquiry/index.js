import React, { Component} from "react/addons"; /* eslint no-unused-vars:0*/
import pureRender from "pure-render-decorator";
import CentralLead from "./CentralLead";
import AddEnquiry from "./AddEnquiry";
import UpdateEnquiry from "./UpdateEnquiry";


export default {
    CentralLead,
    UpdateEnquiry,
    AddEnquiry
};

@pureRender
class _AddEnquiry extends Component {
  render(){
    //alert(JSON.stringify(this.props));
    return <div>Add enquiry</div>;
  };
}

@pureRender
class _UpdateEnquiry extends Component {
  render(){
    //alert(JSON.stringify(this.props));
    return <div>Add enquiry</div>;
  };
}
