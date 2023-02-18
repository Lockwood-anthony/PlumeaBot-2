const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
const mes = require("../utils/message")

module.exports = {
    name: 'textThemes',
    async execute(inter){
        const split = inter.customId.split('/')
        const textUUID = split[1]
        const textModelUUID = split[2]
        const PostProcess = split[3]

        const menu = await require("../selectMenus/textThemes").get(textUUID, textModelUUID, PostProcess)
        await mes.interSuccess(inter, null, null, [menu])


    },

    get(textUUID, textModelUUID, PostProcess, row = true){
        const button = new ButtonBuilder()
            .setCustomId(this.name + "/" + textUUID + "/" + textModelUUID + "/" + PostProcess)
            .setLabel('Formulaire 2/3 - Thèmes')
            .setStyle('Success')

        if(row){
            return new ActionRowBuilder().setComponents(button)
        }else{
            return button
        }

    }

}