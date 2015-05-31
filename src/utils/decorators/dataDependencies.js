import {Resolver} from "../../resolve/index";

export default (resolve)=>
    (target)=> Resolver.createContainer(target, {resolve});
