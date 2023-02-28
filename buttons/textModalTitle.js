const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
const mes = require("../utils/message")

module.exports = {
    name: 'textModalTitle',
    async execute(inter){
        const split = inter.customId.split('/')
        const textUUID = split[1]
        const textModelUUID = split[2]
        const PostProcess = split[3]

        await mes.interSuccess(inter, await require("../modals/textIdTitle").get(textUUID, textModelUUID, PostProcess))
        
    },

    get(textUUID, textModelUUID, PostProcess, row = true){
        const button = new ButtonBuilder()
            .setCustomId(this.name + "/" + textUUID + "/" + textModelUUID + "/" + PostProcess)
            .setLabel('Id_Titre')
            .setStyle('Success')

        if(row){
            return new ActionRowBuilder().setComponents(button)
        }else{
            return button
        }

    }

}