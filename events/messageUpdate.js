const mes = require("../utils/message");
module.exports = {
    name: "messageUpdate",

    async execute(oldMes, newMes){

        if(!oldMes.author.bot){
            await mes.logMes(oldMes, "Updated")

        }

    }

}