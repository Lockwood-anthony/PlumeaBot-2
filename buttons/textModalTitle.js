const { ActionRowBuilder, ButtonBuilder } = require('discord.js')

module.exports = {
    name: 'textModalTitle',
    async execute(inter){
        const split = inter.customId.split('/')
        const textUUID = split[1]
        const textModelUUID = split[2]
        const PostProcess = split[3]

        inter.showModal(
            await require("../modals/textDtTitle").get(textUUID, textModelUUID, PostProcess))
        
    },

    get(textUUID, textModelUUID, PostProcess, row = true){
        const button = new ButtonBuilder()
            .setCustomId(this.name + "/" + textUUID + "/" + textModelUUID + "/" + PostProcess)
            .setLabel('Dt_Titre')
            .setStyle('Success')

        if(row){
            return new ActionRowBuilder().setComponents(button)
        }else{
            return button
        }

    }

}