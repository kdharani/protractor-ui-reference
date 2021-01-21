let log4js=require('log4js');

let log=function(){
    log4js.configure('./utils/log4js.json');
    let log=log4js.getLogger("default");
    return log;
}

module.exports={
    log
}
