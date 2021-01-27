export class logger{

    static log(): any {
        var log4js = require('log4js');
        log4js.configure('./utils/log4js.json');
        //var logger = log4js.getLogger(); //for both console and file
        let log = log4js.getLogger("default");
        return log;
    }
}