import React from "react";

export default (target)=>
{
  target.contextTypes = {
    flux: React.PropTypes.object.isRequired
  };
  return target;
};
