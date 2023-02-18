const { ButtonBuilder, ActionRowBuilder } = require('discord.js')
const mes = require("../utils/message")

module.exports = {
    name: 'textGetPassword',
    async execute(inter){
        const tUtils = require('../utils/text')

        const textId = inter.customId.split('/')[1]
        const member = inter.member

        const sent = await tUtils.sendFile(textId, member)

        if(sent){
            await mes.interSuccess(inter)

        }else{
            await mes.interError(inter, "Mec, ouvre tes mp -_- Tu crois que je vais t'envoyer le fichier comment sinon ...")

        }

    },

    get(textId){
        return new ButtonBuilder()
            .setCustomId(this.name+'/'+textId)
            .setLabel('Prend moi')
            .setStyle('Success')

    }

}