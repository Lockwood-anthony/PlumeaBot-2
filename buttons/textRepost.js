const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
const mes = require("../utils/message")
const tUtils = require("../utils/text")

module.exports = {
    name: 'textRepost',
    async execute(inter){
        const textUUID = inter.customId.split('/')[1]
        const textDt = await tUtils.getDt(textUUID)

        await mes.interSuccess(inter, "Tape la commande :\n\n /repost `" + textDt + "`\n\nNE PAS COPIER MAIS TAPER LE NOM DE LA COMMANDE A LA MAIN")

    },

    get(textUUID, row = true){
        const button = new ButtonBuilder()
            .setCustomId(this.name + "/" + textUUID)
            .setLabel('Fichier')
            .setStyle('Success')

        if(row){
            return new ActionRowBuilder().setComponents(button)
        }else{
            return button
        }

    }

}