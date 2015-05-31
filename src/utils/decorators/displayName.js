export default (name)=>
    (target)=>{
        target.displayName = name;
        return target;
    };
