export class logger{

    static log(): any {
        const log4js = require('log4js');
        log4js.configure('./utils/log4js.json');
        const log = log4js.getLogger("default");
        return log;
    }
}