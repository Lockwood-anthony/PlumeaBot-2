const mes = require("../utils/message");
module.exports = {
    name: "messageUpdate",

    execute(oldMes, newMes){

        if(!oldMes.author.bot){
            mes.logMes(oldMes, "Updated")

        }

    }

}