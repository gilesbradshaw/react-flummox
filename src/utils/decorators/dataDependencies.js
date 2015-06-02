import {Resolver} from "../../resolve/index";

export default (resolve)=>
    (target)=> Resolver.createContainer(target, {resolve});

export var errorRender = (render)=>
    (target)=>{
        target.errorRender = render;
        return target;
    };

export var waitRender = (render)=>
    (target)=>{
        target.waitRender = render;
        return target;
    };
