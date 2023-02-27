const { ButtonBuilder } = require('discord.js')
const mes = require("../utils/message")
const sUtils = require("../utils/sprint")
const sprint = require("../utils/sprint")

module.exports = {
    name: 'sprintLeave',

    async execute(inter, confirmed= false, customId){

        if(confirmed){
            const id = customId.split("/")[1]

            if(sprint.exists(id)){
                await sUtils.removeSprinter(id, inter.member.id)
                await sprint.updateRunningMessageDesc(id)

                await mes.interSuccess(inter, "Tu as bien quitté le sprint :)")

            }else{
                await mes.interError(inter, "Ce sprint est terminé !")
            }

        }else{
            const confirm = require('../selectMenus/confirm')

            await mes.interSuccess(inter, { content: "Veux-tu vraiment quitter le sprint ?", components : [confirm.get(inter, __filename, inter.customId)] })

        }

    },

    get(id){
        return new ButtonBuilder()
            .setCustomId(this.name + "/" + id)
            .setLabel(this.name)
            .setStyle('Primary')

    }

}